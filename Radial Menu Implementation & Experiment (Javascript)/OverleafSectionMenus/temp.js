! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ide = t() : (e.Frontend = e.Frontend || {}, e.Frontend.ide = t())
}(window, function() {
    return function(e) {
        function t(t) {
            for (var r, s, a = t[0], l = t[1], c = t[2], h = 0, d = []; h < a.length; h++) s = a[h], Object.prototype.hasOwnProperty.call(i, s) && i[s] && d.push(i[s][0]), i[s] = 0;
            for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (e[r] = l[r]);
            for (u && u(t); d.length;) d.shift()();
            return o.push.apply(o, c || []), n()
        }

        function n() {
            for (var e, t = 0; t < o.length; t++) {
                for (var n = o[t], r = !0, a = 1; a < n.length; a++) {
                    var l = n[a];
                    0 !== i[l] && (r = !1)
                }
                r && (o.splice(t--, 1), e = s(s.s = n[0]))
            }
            return e
        }
        var r = {},
            i = {
                2: 0
            },
            o = [];

        function s(t) {
            if (r[t]) return r[t].exports;
            var n = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(n.exports, n, n.exports, s), n.l = !0, n.exports
        }
        s.e = function(e) {
            var t = [],
                n = i[e];
            if (0 !== n)
                if (n) t.push(n[2]);
                else {
                    var r = new Promise(function(t, r) {
                        n = i[e] = [t, r]
                    });
                    t.push(n[2] = r);
                    var o, a = document.createElement("script");
                    a.charset = "utf-8", a.timeout = 120, s.nc && a.setAttribute("nonce", s.nc), a.src = function(e) {
                        return s.p + "" + ({
                            1: "vendors~publish-modal~rich-text",
                            5: "publish-modal",
                            6: "rich-text",
                            7: "vendors~pdfjsWorker",
                            8: "vendors~publish-modal",
                            9: "vendors~rich-text"
                        }[e] || e) + "-" + {
                            1: "51eb9817bcdb3bd80f50",
                            5: "347ad055efff8399529f",
                            6: "996415d71048d0a1dcff",
                            7: "3a6b72a73e5f2a322b6e",
                            8: "818e8a5a9e80ff7f689c",
                            9: "f46105931a99382a9f79"
                        }[e] + ".js"
                    }(e);
                    var l = new Error;
                    o = function(t) {
                        a.onerror = a.onload = null, clearTimeout(c);
                        var n = i[e];
                        if (0 !== n) {
                            if (n) {
                                var r = t && ("load" === t.type ? "missing" : t.type),
                                    o = t && t.target && t.target.src;
                                l.message = "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")", l.name = "ChunkLoadError", l.type = r, l.request = o, n[1](l)
                            }
                            i[e] = void 0
                        }
                    };
                    var c = setTimeout(function() {
                        o({
                            type: "timeout",
                            target: a
                        })
                    }, 12e4);
                    a.onerror = a.onload = o, document.head.appendChild(a)
                }
            return Promise.all(t)
        }, s.m = e, s.c = r, s.d = function(e, t, n) {
            s.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, s.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, s.t = function(e, t) {
            if (1 & t && (e = s(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (s.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
                for (var r in e) s.d(n, r, function(t) {
                    return e[t]
                }.bind(null, r));
            return n
        }, s.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return s.d(t, "a", t), t
        }, s.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, s.p = "/js/", s.oe = function(e) {
            throw console.error(e), e
        };
        var a = window.webpackJsonp = window.webpackJsonp || [],
            l = a.push.bind(a);
        a.push = t, a = a.slice();
        for (var c = 0; c < a.length; c++) t(a[c]);
        var u = l;
        return o.push([145, 0]), n()
    }([function(e, t, n) {
        var r, i;

        function o(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
            }(e) || function(e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function s(e, t) {
            return null != e ? t(e) : void 0
        }
        r = [n(15), n(53), n(54), n(55), n(24), n(25), n(16), n(26), n(27)], void 0 === (i = function() {
            var e = angular.module("SharelatexApp", ["ui.bootstrap", "autocomplete", "RecursionHelper", "ng-context-menu", "underscore", "ngSanitize", "ipCookie", "ErrorCatcher", "localStorage", "sessionStorage", "ngTagsInput", "ui.select"]).config(["$qProvider", "$httpProvider", "uiSelectConfig", function(e, t, n) {
                return e.errorOnUnhandledRejections(!1), n.spinnerClass = "fa fa-refresh ui-select-spin", s("undefined" != typeof MathJax && null !== MathJax ? MathJax.Hub : void 0, function(e) {
                    return e.Config({
                        messageStyle: "none",
                        imageFont: null,
                        "HTML-CSS": {
                            availableFonts: ["TeX"],
                            scale: 110,
                            matchFontHeight: !1
                        },
                        TeX: {
                            equationNumbers: {
                                autoNumber: "AMS"
                            },
                            useLabelIDs: !1
                        },
                        skipStartupTypeset: !0,
                        tex2jax: {
                            processEscapes: !0,
                            inlineMath: [
                                ["\\(", "\\)"]
                            ],
                            displayMath: [
                                ["$$", "$$"],
                                ["\\[", "\\]"]
                            ]
                        }
                    })
                })
            }]);
            e.run(["$templateCache", function(e) {
                return e.put("bootstrap/match.tpl.html", '<div class="ui-select-match" ng-hide="$select.open && $select.searchEnabled" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;"><span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> <i class="caret pull-right" ng-click="$select.toggle($event)"></i> <a ng-show="$select.allowClear && !$select.isEmpty() && ($select.disabled !== true)" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right"><i class="fa fa-times" aria-hidden="true"></i></a></span></div>')
            }]);
            var t = null != s(null != window.location ? window.location.search : void 0, function(e) {
                    return e.match(/debug=true/)
                }),
                n = null;
            return window.sl_debugging = t, window.sl_console = {
                log: function() {
                    if (t) {
                        var e;
                        n = null;
                        for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++) i[s] = arguments[s];
                        return (e = console).log.apply(e, o(Array.from(i || [])))
                    }
                },
                logOnce: function() {
                    for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                    var s;
                    if (t && r[0] !== n) return n = r[0], (s = console).log.apply(s, o(Array.from(r || [])))
                }
            }, e
        }.apply(t, r)) || (e.exports = i)
    }, , , , function(e, t, n) {
        (function(e) {
            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }! function() {
                var e = function() {
                    return this
                }();
                e || "undefined" == typeof window || (e = window);
                var t = function e(t, n, r) {
                    "string" == typeof t ? (2 == arguments.length && (r = n), e.modules[t] || (e.payloads[t] = r, e.modules[t] = null)) : e.original ? e.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())
                };
                t.modules = {}, t.payloads = {};
                var n, r, i = function(e, t, n) {
                        if ("string" == typeof t) {
                            var r = s(e, t);
                            if (null != r) return n && n(), r
                        } else if ("[object Array]" === Object.prototype.toString.call(t)) {
                            for (var i = [], a = 0, l = t.length; a < l; ++a) {
                                var c = s(e, t[a]);
                                if (null == c && o.original) return;
                                i.push(c)
                            }
                            return n && n.apply(null, i) || !0
                        }
                    },
                    o = function e(t, n) {
                        var r = i("", t, n);
                        return null == r && e.original ? e.original.apply(this, arguments) : r
                    },
                    s = function(e, n) {
                        n = function e(t, n) {
                            if (-1 !== n.indexOf("!")) {
                                var r = n.split("!");
                                return e(t, r[0]) + "!" + e(t, r[1])
                            }
                            if ("." == n.charAt(0))
                                for (n = t.split("/").slice(0, -1).join("/") + "/" + n; - 1 !== n.indexOf(".") && i != n;) {
                                    var i = n;
                                    n = n.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                                }
                            return n
                        }(e, n);
                        var r = t.modules[n];
                        if (!r) {
                            if ("function" == typeof(r = t.payloads[n])) {
                                var o = {},
                                    s = {
                                        id: n,
                                        uri: "",
                                        exports: o,
                                        packaged: !0
                                    };
                                o = r(function(e, t) {
                                    return i(n, e, t)
                                }, o, s) || s.exports, t.modules[n] = o, delete t.payloads[n]
                            }
                            r = t.modules[n] = o || r
                        }
                        return r
                    };
                r = e, (n = "ace") && (e[n] || (e[n] = {}), r = e[n]), r.define && r.define.packaged || (t.original = r.define, r.define = t, r.define.packaged = !0), r.require && r.require.packaged || (o.original = r.require, r.require = o, r.require.packaged = !0)
            }(), ace.define("ace/lib/regexp", [], function(e, t, n) {
                "use strict";
                var r, i = {
                        exec: RegExp.prototype.exec,
                        test: RegExp.prototype.test,
                        match: String.prototype.match,
                        replace: String.prototype.replace,
                        split: String.prototype.split
                    },
                    o = void 0 === i.exec.call(/()??/, "")[1],
                    s = (r = /^/g, i.test.call(r, ""), !r.lastIndex);

                function a(e) {
                    return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
                }

                function l(e, t, n) {
                    if (Array.prototype.indexOf) return e.indexOf(t, n);
                    for (var r = n || 0; r < e.length; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                s && o || (RegExp.prototype.exec = function(e) {
                    var t, n, r = i.exec.apply(this, arguments);
                    if ("string" == typeof e && r) {
                        if (!o && r.length > 1 && l(r, "") > -1 && (n = RegExp(this.source, i.replace.call(a(this), "g", "")), i.replace.call(e.slice(r.index), n, function() {
                            for (var e = 1; e < arguments.length - 2; e++) void 0 === arguments[e] && (r[e] = void 0)
                        })), this._xregexp && this._xregexp.captureNames)
                            for (var c = 1; c < r.length; c++)(t = this._xregexp.captureNames[c - 1]) && (r[t] = r[c]);
                        !s && this.global && !r[0].length && this.lastIndex > r.index && this.lastIndex--
                    }
                    return r
                }, s || (RegExp.prototype.test = function(e) {
                    var t = i.exec.call(this, e);
                    return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
                }))
            }), ace.define("ace/lib/es5-shim", [], function(e, t, n) {
                function i() {}
                Function.prototype.bind || (Function.prototype.bind = function(e) {
                    var t = this;
                    if ("function" != typeof t) throw new TypeError("Function.prototype.bind called on incompatible " + t);
                    var n = f.call(arguments, 1),
                        r = function r() {
                            if (this instanceof r) {
                                var i = t.apply(this, n.concat(f.call(arguments)));
                                return Object(i) === i ? i : this
                            }
                            return t.apply(e, n.concat(f.call(arguments)))
                        };
                    return t.prototype && (i.prototype = t.prototype, r.prototype = new i, i.prototype = null), r
                });
                var o, s, a, l, c, u = Function.prototype.call,
                    h = Array.prototype,
                    d = Object.prototype,
                    f = h.slice,
                    p = u.bind(d.toString),
                    g = u.bind(d.hasOwnProperty);
                if ((c = g(d, "__defineGetter__")) && (o = u.bind(d.__defineGetter__), s = u.bind(d.__defineSetter__), a = u.bind(d.__lookupGetter__), l = u.bind(d.__lookupSetter__)), 2 != [1, 2].splice(0).length)
                    if (function() {
                        function e(e) {
                            var t = new Array(e + 2);
                            return t[0] = t[1] = 0, t
                        }
                        var t, n = [];
                        if (n.splice.apply(n, e(20)), n.splice.apply(n, e(26)), t = n.length, n.splice(5, 0, "XXX"), n.length, t + 1 == n.length) return !0
                    }()) {
                        var m = Array.prototype.splice;
                        Array.prototype.splice = function(e, t) {
                            return arguments.length ? m.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(f.call(arguments, 2))) : []
                        }
                    } else Array.prototype.splice = function(e, t) {
                        var n = this.length;
                        e > 0 ? e > n && (e = n) : null == e ? e = 0 : e < 0 && (e = Math.max(n + e, 0)), e + t < n || (t = n - e);
                        var r = this.slice(e, e + t),
                            i = f.call(arguments, 2),
                            o = i.length;
                        if (e === n) o && this.push.apply(this, i);
                        else {
                            var s = Math.min(t, n - e),
                                a = e + s,
                                l = a + o - s,
                                c = n - a,
                                u = n - s;
                            if (l < a)
                                for (var h = 0; h < c; ++h) this[l + h] = this[a + h];
                            else if (l > a)
                                for (h = c; h--;) this[l + h] = this[a + h];
                            if (o && e === u) this.length = u, this.push.apply(this, i);
                            else
                                for (this.length = u + o, h = 0; h < o; ++h) this[e + h] = i[h]
                        }
                        return r
                    };
                Array.isArray || (Array.isArray = function(e) {
                    return "[object Array]" == p(e)
                });
                var v, y, b = Object("a"),
                    w = "a" != b[0] || !(0 in b);
                if (Array.prototype.forEach || (Array.prototype.forEach = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = arguments[1],
                        i = -1,
                        o = n.length >>> 0;
                    if ("[object Function]" != p(e)) throw new TypeError;
                    for (; ++i < o;) i in n && e.call(r, n[i], i, t)
                }), Array.prototype.map || (Array.prototype.map = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = n.length >>> 0,
                        i = Array(r),
                        o = arguments[1];
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    for (var s = 0; s < r; s++) s in n && (i[s] = e.call(o, n[s], s, t));
                    return i
                }), Array.prototype.filter || (Array.prototype.filter = function(e) {
                    var t, n = P(this),
                        r = w && "[object String]" == p(this) ? this.split("") : n,
                        i = r.length >>> 0,
                        o = [],
                        s = arguments[1];
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    for (var a = 0; a < i; a++) a in r && (t = r[a], e.call(s, t, a, n) && o.push(t));
                    return o
                }), Array.prototype.every || (Array.prototype.every = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = n.length >>> 0,
                        i = arguments[1];
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    for (var o = 0; o < r; o++)
                        if (o in n && !e.call(i, n[o], o, t)) return !1;
                    return !0
                }), Array.prototype.some || (Array.prototype.some = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = n.length >>> 0,
                        i = arguments[1];
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    for (var o = 0; o < r; o++)
                        if (o in n && e.call(i, n[o], o, t)) return !0;
                    return !1
                }), Array.prototype.reduce || (Array.prototype.reduce = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = n.length >>> 0;
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    if (!r && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
                    var i, o = 0;
                    if (arguments.length >= 2) i = arguments[1];
                    else
                        for (;;) {
                            if (o in n) {
                                i = n[o++];
                                break
                            }
                            if (++o >= r) throw new TypeError("reduce of empty array with no initial value")
                        }
                    for (; o < r; o++) o in n && (i = e.call(void 0, i, n[o], o, t));
                    return i
                }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(e) {
                    var t = P(this),
                        n = w && "[object String]" == p(this) ? this.split("") : t,
                        r = n.length >>> 0;
                    if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
                    if (!r && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                    var i, o = r - 1;
                    if (arguments.length >= 2) i = arguments[1];
                    else
                        for (;;) {
                            if (o in n) {
                                i = n[o--];
                                break
                            }
                            if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
                        }
                    do {
                        o in this && (i = e.call(void 0, i, n[o], o, t))
                    } while (o--);
                    return i
                }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function(e) {
                    var t = w && "[object String]" == p(this) ? this.split("") : P(this),
                        n = t.length >>> 0;
                    if (!n) return -1;
                    var r = 0;
                    for (arguments.length > 1 && (r = L(arguments[1])), r = r >= 0 ? r : Math.max(0, n + r); r < n; r++)
                        if (r in t && t[r] === e) return r;
                    return -1
                }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(e) {
                    var t = w && "[object String]" == p(this) ? this.split("") : P(this),
                        n = t.length >>> 0;
                    if (!n) return -1;
                    var r = n - 1;
                    for (arguments.length > 1 && (r = Math.min(r, L(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r); r >= 0; r--)
                        if (r in t && e === t[r]) return r;
                    return -1
                }), Object.getPrototypeOf || (Object.getPrototypeOf = function(e) {
                    return e.__proto__ || (e.constructor ? e.constructor.prototype : d)
                }), !Object.getOwnPropertyDescriptor) {
                    Object.getOwnPropertyDescriptor = function(e, t) {
                        if ("object" != r(e) && "function" != typeof e || null === e) throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + e);
                        if (g(e, t)) {
                            var n;
                            if (n = {
                                enumerable: !0,
                                configurable: !0
                            }, c) {
                                var i = e.__proto__;
                                e.__proto__ = d;
                                var o = a(e, t),
                                    s = l(e, t);
                                if (e.__proto__ = i, o || s) return o && (n.get = o), s && (n.set = s), n
                            }
                            return n.value = e[t], n
                        }
                    }
                }(Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(e) {
                    return Object.keys(e)
                }), Object.create) || (v = null === Object.prototype.__proto__ ? function() {
                    return {
                        __proto__: null
                    }
                } : function() {
                    var e = {};
                    for (var t in e) e[t] = null;
                    return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
                }, Object.create = function(e, t) {
                    var n;
                    if (null === e) n = v();
                    else {
                        if ("object" != r(e)) throw new TypeError("typeof prototype[" + r(e) + "] != 'object'");
                        var i = function() {};
                        i.prototype = e, (n = new i).__proto__ = e
                    }
                    return void 0 !== t && Object.defineProperties(n, t), n
                });

                function _(e) {
                    try {
                        return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
                    } catch (e) {}
                }
                if (Object.defineProperty) {
                    var C = _({}),
                        S = "undefined" == typeof document || _(document.createElement("div"));
                    if (!C || !S) var k = Object.defineProperty
                }
                if (!Object.defineProperty || k) {
                    Object.defineProperty = function(e, t, n) {
                        if ("object" != r(e) && "function" != typeof e || null === e) throw new TypeError("Object.defineProperty called on non-object: " + e);
                        if ("object" != r(n) && "function" != typeof n || null === n) throw new TypeError("Property description must be an object: " + n);
                        if (k) try {
                            return k.call(Object, e, t, n)
                        } catch (e) {}
                        if (g(n, "value"))
                            if (c && (a(e, t) || l(e, t))) {
                                var i = e.__proto__;
                                e.__proto__ = d, delete e[t], e[t] = n.value, e.__proto__ = i
                            } else e[t] = n.value;
                        else {
                            if (!c) throw new TypeError("getters & setters can not be defined on this javascript engine");
                            g(n, "get") && o(e, t, n.get), g(n, "set") && s(e, t, n.set)
                        }
                        return e
                    }
                }
                Object.defineProperties || (Object.defineProperties = function(e, t) {
                    for (var n in t) g(t, n) && Object.defineProperty(e, n, t[n]);
                    return e
                }), Object.seal || (Object.seal = function(e) {
                    return e
                }), Object.freeze || (Object.freeze = function(e) {
                    return e
                });
                try {
                    Object.freeze(function() {})
                } catch (e) {
                    Object.freeze = (y = Object.freeze, function(e) {
                        return "function" == typeof e ? e : y(e)
                    })
                }
                if (Object.preventExtensions || (Object.preventExtensions = function(e) {
                    return e
                }), Object.isSealed || (Object.isSealed = function(e) {
                    return !1
                }), Object.isFrozen || (Object.isFrozen = function(e) {
                    return !1
                }), Object.isExtensible || (Object.isExtensible = function(e) {
                    if (Object(e) === e) throw new TypeError;
                    for (var t = ""; g(e, t);) t += "?";
                    e[t] = !0;
                    var n = g(e, t);
                    return delete e[t], n
                }), !Object.keys) {
                    var A = !0,
                        x = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                        $ = x.length;
                    for (var T in {
                        toString: null
                    }) A = !1;
                    Object.keys = function(e) {
                        if ("object" != r(e) && "function" != typeof e || null === e) throw new TypeError("Object.keys called on a non-object");
                        var t = [];
                        for (var n in e) g(e, n) && t.push(n);
                        if (A)
                            for (var i = 0, o = $; i < o; i++) {
                                var s = x[i];
                                g(e, s) && t.push(s)
                            }
                        return t
                    }
                }
                Date.now || (Date.now = function() {
                    return (new Date).getTime()
                });
                var E = "\t\n\v\f\r Â áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff";
                if (!String.prototype.trim || E.trim()) {
                    E = "[" + E + "]";
                    var R = new RegExp("^" + E + E + "*"),
                        M = new RegExp(E + E + "*$");
                    String.prototype.trim = function() {
                        return String(this).replace(R, "").replace(M, "")
                    }
                }

                function L(e) {
                    return (e = +e) != e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
                }
                var P = function(e) {
                    if (null == e) throw new TypeError("can't convert " + e + " to object");
                    return Object(e)
                }
            }), ace.define("ace/lib/fixoldbrowsers", [], function(e, t, n) {
                "use strict";
                e("./regexp"), e("./es5-shim"), "undefined" == typeof Element || Element.prototype.remove || Object.defineProperty(Element.prototype, "remove", {
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                    value: function() {
                        this.parentNode && this.parentNode.removeChild(this)
                    }
                })
            }), ace.define("ace/lib/useragent", [], function(e, t, n) {
                "use strict";
                t.OS = {
                    LINUX: "LINUX",
                    MAC: "MAC",
                    WINDOWS: "WINDOWS"
                }, t.getOS = function() {
                    return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
                };
                var i = "object" == ("undefined" == typeof navigator ? "undefined" : r(navigator)) ? navigator : {},
                    o = (/mac|win|linux/i.exec(i.platform) || ["other"])[0].toLowerCase(),
                    s = i.userAgent || "",
                    a = i.appName || "";
                t.isWin = "win" == o, t.isMac = "mac" == o, t.isLinux = "linux" == o, t.isIE = "Microsoft Internet Explorer" == a || a.indexOf("MSAppHost") >= 0 ? parseFloat((s.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((s.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = s.match(/ Gecko\/\d+/), t.isOpera = "object" == ("undefined" == typeof opera ? "undefined" : r(opera)) && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(s.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(s.split(" Chrome/")[1]) || void 0, t.isEdge = parseFloat(s.split(" Edge/")[1]) || void 0, t.isAIR = s.indexOf("AdobeAIR") >= 0, t.isIPad = s.indexOf("iPad") >= 0, t.isAndroid = s.indexOf("Android") >= 0, t.isChromeOS = s.indexOf(" CrOS ") >= 0, t.isIOS = /iPad|iPhone|iPod/.test(s) && !window.MSStream, t.isIOS && (t.isMac = !0), t.isMobile = t.isIPad || t.isAndroid
            }), ace.define("ace/lib/dom", [], function(e, t, n) {
                "use strict";
                var i = e("./useragent");
                if (t.buildDom = function e(t, n, i) {
                    if ("string" == typeof t && t) {
                        var o = document.createTextNode(t);
                        return n && n.appendChild(o), o
                    }
                    if (!Array.isArray(t)) return t;
                    if ("string" != typeof t[0] || !t[0]) {
                        for (var s = [], a = 0; a < t.length; a++) {
                            var l = e(t[a], n, i);
                            l && s.push(l)
                        }
                        return s
                    }
                    var c = document.createElement(t[0]),
                        u = t[1],
                        h = 1;
                    u && "object" == r(u) && !Array.isArray(u) && (h = 2);
                    for (a = h; a < t.length; a++) e(t[a], c, i);
                    return 2 == h && Object.keys(u).forEach(function(e) {
                        var t = u[e];
                        "class" === e ? c.className = Array.isArray(t) ? t.join(" ") : t : "function" == typeof t || "value" == e ? c[e] = t : "ref" === e ? i && (i[t] = c) : null != t && c.setAttribute(e, t)
                    }), n && n.appendChild(c), c
                }, t.getDocumentHead = function(e) {
                    return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
                }, t.createElement = function(e, t) {
                    return document.createElementNS ? document.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : document.createElement(e)
                }, t.removeChildren = function(e) {
                    e.innerHTML = ""
                }, t.createTextNode = function(e, t) {
                    return (t ? t.ownerDocument : document).createTextNode(e)
                }, t.createFragment = function(e) {
                    return (e ? e.ownerDocument : document).createDocumentFragment()
                }, t.hasCssClass = function(e, t) {
                    return -1 !== (e.className + "").split(/\s+/g).indexOf(t)
                }, t.addCssClass = function(e, n) {
                    t.hasCssClass(e, n) || (e.className += " " + n)
                }, t.removeCssClass = function(e, t) {
                    for (var n = e.className.split(/\s+/g);;) {
                        var r = n.indexOf(t);
                        if (-1 == r) break;
                        n.splice(r, 1)
                    }
                    e.className = n.join(" ")
                }, t.toggleCssClass = function(e, t) {
                    for (var n = e.className.split(/\s+/g), r = !0;;) {
                        var i = n.indexOf(t);
                        if (-1 == i) break;
                        r = !1, n.splice(i, 1)
                    }
                    return r && n.push(t), e.className = n.join(" "), r
                }, t.setCssClass = function(e, n, r) {
                    r ? t.addCssClass(e, n) : t.removeCssClass(e, n)
                }, t.hasCssString = function(e, t) {
                    var n, r = 0;
                    if (n = (t = t || document).querySelectorAll("style"))
                        for (; r < n.length;)
                            if (n[r++].id === e) return !0
                }, t.importCssString = function(e, n, r) {
                    var i = r;
                    r && r.getRootNode && (i = r.getRootNode()) && i != r || (i = document);
                    var o = i.ownerDocument || i;
                    if (n && t.hasCssString(n, i)) return null;
                    n && (e += "\n/*# sourceURL=ace/css/" + n + " */");
                    var s = t.createElement("style");
                    s.appendChild(o.createTextNode(e)), n && (s.id = n), i == o && (i = t.getDocumentHead(o)), i.insertBefore(s, i.firstChild)
                }, t.importCssStylsheet = function(e, n) {
                    t.buildDom(["link", {
                        rel: "stylesheet",
                        href: e
                    }], t.getDocumentHead(n))
                }, t.scrollbarWidth = function(e) {
                    var n = t.createElement("ace_inner");
                    n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
                    var r = t.createElement("ace_outer"),
                        i = r.style;
                    i.position = "absolute", i.left = "-10000px", i.overflow = "hidden", i.width = "200px", i.minWidth = "0px", i.height = "150px", i.display = "block", r.appendChild(n);
                    var o = e.documentElement;
                    o.appendChild(r);
                    var s = n.offsetWidth;
                    i.overflow = "scroll";
                    var a = n.offsetWidth;
                    return s == a && (a = r.clientWidth), o.removeChild(r), s - a
                }, "undefined" == typeof document && (t.importCssString = function() {}), t.computedStyle = function(e, t) {
                    return window.getComputedStyle(e, "") || {}
                }, t.setStyle = function(e, t, n) {
                    e[t] !== n && (e[t] = n)
                }, t.HAS_CSS_ANIMATION = !1, t.HAS_CSS_TRANSFORMS = !1, t.HI_DPI = !i.isWin || "undefined" != typeof window && window.devicePixelRatio >= 1.5, "undefined" != typeof document) {
                    var o = document.createElement("div");
                    t.HI_DPI && void 0 !== o.style.transform && (t.HAS_CSS_TRANSFORMS = !0), i.isEdge || void 0 === o.style.animationName || (t.HAS_CSS_ANIMATION = !0), o = null
                }
                t.HAS_CSS_TRANSFORMS ? t.translate = function(e, t, n) {
                    e.style.transform = "translate(" + Math.round(t) + "px, " + Math.round(n) + "px)"
                } : t.translate = function(e, t, n) {
                    e.style.top = Math.round(n) + "px", e.style.left = Math.round(t) + "px"
                }
            }), ace.define("ace/lib/oop", [], function(e, t, n) {
                "use strict";
                t.inherits = function(e, t) {
                    e.super_ = t, e.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })
                }, t.mixin = function(e, t) {
                    for (var n in t) e[n] = t[n];
                    return e
                }, t.implement = function(e, n) {
                    t.mixin(e, n)
                }
            }), ace.define("ace/lib/keys", [], function(e, t, n) {
                "use strict";
                var r = e("./oop"),
                    i = function() {
                        var e, t, n = {
                            MODIFIER_KEYS: {
                                16: "Shift",
                                17: "Ctrl",
                                18: "Alt",
                                224: "Meta"
                            },
                            KEY_MODS: {
                                ctrl: 1,
                                alt: 2,
                                option: 2,
                                shift: 4,
                                super: 8,
                                meta: 8,
                                command: 8,
                                cmd: 8
                            },
                            FUNCTION_KEYS: {
                                8: "Backspace",
                                9: "Tab",
                                13: "Return",
                                19: "Pause",
                                27: "Esc",
                                32: "Space",
                                33: "PageUp",
                                34: "PageDown",
                                35: "End",
                                36: "Home",
                                37: "Left",
                                38: "Up",
                                39: "Right",
                                40: "Down",
                                44: "Print",
                                45: "Insert",
                                46: "Delete",
                                96: "Numpad0",
                                97: "Numpad1",
                                98: "Numpad2",
                                99: "Numpad3",
                                100: "Numpad4",
                                101: "Numpad5",
                                102: "Numpad6",
                                103: "Numpad7",
                                104: "Numpad8",
                                105: "Numpad9",
                                "-13": "NumpadEnter",
                                112: "F1",
                                113: "F2",
                                114: "F3",
                                115: "F4",
                                116: "F5",
                                117: "F6",
                                118: "F7",
                                119: "F8",
                                120: "F9",
                                121: "F10",
                                122: "F11",
                                123: "F12",
                                144: "Numlock",
                                145: "Scrolllock"
                            },
                            PRINTABLE_KEYS: {
                                32: " ",
                                48: "0",
                                49: "1",
                                50: "2",
                                51: "3",
                                52: "4",
                                53: "5",
                                54: "6",
                                55: "7",
                                56: "8",
                                57: "9",
                                59: ";",
                                61: "=",
                                65: "a",
                                66: "b",
                                67: "c",
                                68: "d",
                                69: "e",
                                70: "f",
                                71: "g",
                                72: "h",
                                73: "i",
                                74: "j",
                                75: "k",
                                76: "l",
                                77: "m",
                                78: "n",
                                79: "o",
                                80: "p",
                                81: "q",
                                82: "r",
                                83: "s",
                                84: "t",
                                85: "u",
                                86: "v",
                                87: "w",
                                88: "x",
                                89: "y",
                                90: "z",
                                107: "+",
                                109: "-",
                                110: ".",
                                186: ";",
                                187: "=",
                                188: ",",
                                189: "-",
                                190: ".",
                                191: "/",
                                192: "`",
                                219: "[",
                                220: "\\",
                                221: "]",
                                222: "'",
                                111: "/",
                                106: "*"
                            }
                        };
                        for (t in n.FUNCTION_KEYS) e = n.FUNCTION_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
                        for (t in n.PRINTABLE_KEYS) e = n.PRINTABLE_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
                        return r.mixin(n, n.MODIFIER_KEYS), r.mixin(n, n.PRINTABLE_KEYS), r.mixin(n, n.FUNCTION_KEYS), n.enter = n.return, n.escape = n.esc, n.del = n.delete, n[173] = "-",
                            function() {
                                for (var e = ["cmd", "ctrl", "alt", "shift"], t = Math.pow(2, e.length); t--;) n.KEY_MODS[t] = e.filter(function(e) {
                                    return t & n.KEY_MODS[e]
                                }).join("-") + "-"
                            }(), n.KEY_MODS[0] = "", n.KEY_MODS[-1] = "input-", n
                    }();
                r.mixin(t, i), t.keyCodeToString = function(e) {
                    var t = i[e];
                    return "string" != typeof t && (t = String.fromCharCode(e)), t.toLowerCase()
                }
            }), ace.define("ace/lib/event", [], function(e, t, n) {
                "use strict";
                var i = e("./keys"),
                    o = e("./useragent"),
                    s = null,
                    a = 0;
                t.addListener = function(e, t, n) {
                    if (e.addEventListener) return e.addEventListener(t, n, !1);
                    if (e.attachEvent) {
                        var r = function() {
                            n.call(e, window.event)
                        };
                        n._wrapper = r, e.attachEvent("on" + t, r)
                    }
                }, t.removeListener = function(e, t, n) {
                    if (e.removeEventListener) return e.removeEventListener(t, n, !1);
                    e.detachEvent && e.detachEvent("on" + t, n._wrapper || n)
                }, t.stopEvent = function(e) {
                    return t.stopPropagation(e), t.preventDefault(e), !1
                }, t.stopPropagation = function(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }, t.preventDefault = function(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }, t.getButton = function(e) {
                    return "dblclick" == e.type ? 0 : "contextmenu" == e.type || o.isMac && e.ctrlKey && !e.altKey && !e.shiftKey ? 2 : e.preventDefault ? e.button : {
                        1: 0,
                        2: 2,
                        4: 1
                    }[e.button]
                }, t.capture = function(e, n, r) {
                    function i(e) {
                        n && n(e), r && r(e), t.removeListener(document, "mousemove", n, !0), t.removeListener(document, "mouseup", i, !0), t.removeListener(document, "dragstart", i, !0)
                    }
                    return t.addListener(document, "mousemove", n, !0), t.addListener(document, "mouseup", i, !0), t.addListener(document, "dragstart", i, !0), i
                }, t.addMouseWheelListener = function(e, n) {
                    "onmousewheel" in e ? t.addListener(e, "mousewheel", function(e) {
                        void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / 8, e.wheelY = -e.wheelDeltaY / 8) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / 8), n(e)
                    }) : "onwheel" in e ? t.addListener(e, "wheel", function(e) {
                        switch (e.deltaMode) {
                            case e.DOM_DELTA_PIXEL:
                                e.wheelX = .35 * e.deltaX || 0, e.wheelY = .35 * e.deltaY || 0;
                                break;
                            case e.DOM_DELTA_LINE:
                            case e.DOM_DELTA_PAGE:
                                e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0)
                        }
                        n(e)
                    }) : t.addListener(e, "DOMMouseScroll", function(e) {
                        e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), n(e)
                    })
                }, t.addMultiMouseDownListener = function(e, n, r, i) {
                    var s, a, l, c = 0,
                        u = {
                            2: "dblclick",
                            3: "tripleclick",
                            4: "quadclick"
                        };

                    function h(e) {
                        if (0 !== t.getButton(e) ? c = 0 : e.detail > 1 ? ++c > 4 && (c = 1) : c = 1, o.isIE) {
                            var h = Math.abs(e.clientX - s) > 5 || Math.abs(e.clientY - a) > 5;
                            l && !h || (c = 1), l && clearTimeout(l), l = setTimeout(function() {
                                l = null
                            }, n[c - 1] || 600), 1 == c && (s = e.clientX, a = e.clientY)
                        }
                        if (e._clicks = c, r[i]("mousedown", e), c > 4) c = 0;
                        else if (c > 1) return r[i](u[c], e)
                    }

                    function d(e) {
                        c = 2, l && clearTimeout(l), l = setTimeout(function() {
                            l = null
                        }, n[c - 1] || 600), r[i]("mousedown", e), r[i](u[c], e)
                    }
                    Array.isArray(e) || (e = [e]), e.forEach(function(e) {
                        t.addListener(e, "mousedown", h), o.isOldIE && t.addListener(e, "dblclick", d)
                    })
                };
                var l = !o.isMac || !o.isOpera || "KeyboardEvent" in window ? function(e) {
                    return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0)
                } : function(e) {
                    return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0)
                };

                function c(e, t, n) {
                    var r = l(t);
                    if (!o.isMac && s) {
                        if (t.getModifierState && (t.getModifierState("OS") || t.getModifierState("Win")) && (r |= 8), s.altGr) {
                            if (3 == (3 & r)) return;
                            s.altGr = 0
                        }
                        if (18 === n || 17 === n) {
                            var c = "location" in t ? t.location : t.keyLocation;
                            if (17 === n && 1 === c) 1 == s[n] && (a = t.timeStamp);
                            else if (18 === n && 3 === r && 2 === c) {
                                t.timeStamp - a < 50 && (s.altGr = !0)
                            }
                        }
                    }
                    if ((n in i.MODIFIER_KEYS && (n = -1), 8 & r && n >= 91 && n <= 93 && (n = -1), !r && 13 === n) && (3 === (c = "location" in t ? t.location : t.keyLocation) && (e(t, r, -n), t.defaultPrevented))) return;
                    if (o.isChromeOS && 8 & r) {
                        if (e(t, r, n), t.defaultPrevented) return;
                        r &= -9
                    }
                    return !!(r || n in i.FUNCTION_KEYS || n in i.PRINTABLE_KEYS) && e(t, r, n)
                }

                function u() {
                    s = Object.create(null)
                }
                if (t.getModifierString = function(e) {
                    return i.KEY_MODS[l(e)]
                }, t.addCommandKeyListener = function(e, n) {
                    var r = t.addListener;
                    if (o.isOldGecko || o.isOpera && !("KeyboardEvent" in window)) {
                        var i = null;
                        r(e, "keydown", function(e) {
                            i = e.keyCode
                        }), r(e, "keypress", function(e) {
                            return c(n, e, i)
                        })
                    } else {
                        var a = null;
                        r(e, "keydown", function(e) {
                            s[e.keyCode] = (s[e.keyCode] || 0) + 1;
                            var t = c(n, e, e.keyCode);
                            return a = e.defaultPrevented, t
                        }), r(e, "keypress", function(e) {
                            a && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), a = null)
                        }), r(e, "keyup", function(e) {
                            s[e.keyCode] = null
                        }), s || (u(), r(window, "focus", u))
                    }
                }, "object" == ("undefined" == typeof window ? "undefined" : r(window)) && window.postMessage && !o.isOldIE) {
                    var h = 1;
                    t.nextTick = function(e, n) {
                        n = n || window;
                        var r = "zero-timeout-message-" + h++;
                        t.addListener(n, "message", function i(o) {
                            o.data == r && (t.stopPropagation(o), t.removeListener(n, "message", i), e())
                        }), n.postMessage(r, "*")
                    }
                }
                t.$idleBlocked = !1, t.onIdle = function(e, n) {
                    return setTimeout(function n() {
                        t.$idleBlocked ? setTimeout(n, 100) : e()
                    }, n)
                }, t.$idleBlockId = null, t.blockIdle = function(e) {
                    t.$idleBlockId && clearTimeout(t.$idleBlockId), t.$idleBlocked = !0, t.$idleBlockId = setTimeout(function() {
                        t.$idleBlocked = !1
                    }, e || 100)
                }, t.nextFrame = "object" == ("undefined" == typeof window ? "undefined" : r(window)) && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function(e) {
                    setTimeout(e, 17)
                }
            }), ace.define("ace/range", [], function(e, t, n) {
                "use strict";
                var i = function(e, t, n, r) {
                    this.start = {
                        row: e,
                        column: t
                    }, this.end = {
                        row: n,
                        column: r
                    }
                };
                (function() {
                    this.isEqual = function(e) {
                        return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
                    }, this.toString = function() {
                        return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
                    }, this.contains = function(e, t) {
                        return 0 == this.compare(e, t)
                    }, this.compareRange = function(e) {
                        var t, n = e.end,
                            r = e.start;
                        return 1 == (t = this.compare(n.row, n.column)) ? 1 == (t = this.compare(r.row, r.column)) ? 2 : 0 == t ? 1 : 0 : -1 == t ? -2 : -1 == (t = this.compare(r.row, r.column)) ? -1 : 1 == t ? 42 : 0
                    }, this.comparePoint = function(e) {
                        return this.compare(e.row, e.column)
                    }, this.containsRange = function(e) {
                        return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
                    }, this.intersects = function(e) {
                        var t = this.compareRange(e);
                        return -1 == t || 0 == t || 1 == t
                    }, this.isEnd = function(e, t) {
                        return this.end.row == e && this.end.column == t
                    }, this.isStart = function(e, t) {
                        return this.start.row == e && this.start.column == t
                    }, this.setStart = function(e, t) {
                        "object" == r(e) ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
                    }, this.setEnd = function(e, t) {
                        "object" == r(e) ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
                    }, this.inside = function(e, t) {
                        return 0 == this.compare(e, t) && (!this.isEnd(e, t) && !this.isStart(e, t))
                    }, this.insideStart = function(e, t) {
                        return 0 == this.compare(e, t) && !this.isEnd(e, t)
                    }, this.insideEnd = function(e, t) {
                        return 0 == this.compare(e, t) && !this.isStart(e, t)
                    }, this.compare = function(e, t) {
                        return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0
                    }, this.compareStart = function(e, t) {
                        return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
                    }, this.compareEnd = function(e, t) {
                        return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
                    }, this.compareInside = function(e, t) {
                        return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
                    }, this.clipRows = function(e, t) {
                        if (this.end.row > t) var n = {
                            row: t + 1,
                            column: 0
                        };
                        else if (this.end.row < e) n = {
                            row: e,
                            column: 0
                        };
                        if (this.start.row > t) var r = {
                            row: t + 1,
                            column: 0
                        };
                        else if (this.start.row < e) r = {
                            row: e,
                            column: 0
                        };
                        return i.fromPoints(r || this.start, n || this.end)
                    }, this.extend = function(e, t) {
                        var n = this.compare(e, t);
                        if (0 == n) return this;
                        if (-1 == n) var r = {
                            row: e,
                            column: t
                        };
                        else var o = {
                            row: e,
                            column: t
                        };
                        return i.fromPoints(r || this.start, o || this.end)
                    }, this.isEmpty = function() {
                        return this.start.row === this.end.row && this.start.column === this.end.column
                    }, this.isMultiLine = function() {
                        return this.start.row !== this.end.row
                    }, this.clone = function() {
                        return i.fromPoints(this.start, this.end)
                    }, this.collapseRows = function() {
                        return 0 == this.end.column ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0)
                    }, this.toScreenRange = function(e) {
                        var t = e.documentToScreenPosition(this.start),
                            n = e.documentToScreenPosition(this.end);
                        return new i(t.row, t.column, n.row, n.column)
                    }, this.moveBy = function(e, t) {
                        this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
                    }
                }).call(i.prototype), i.fromPoints = function(e, t) {
                    return new i(e.row, e.column, t.row, t.column)
                }, i.comparePoints = function(e, t) {
                    return e.row - t.row || e.column - t.column
                }, i.comparePoints = function(e, t) {
                    return e.row - t.row || e.column - t.column
                }, t.Range = i
            }), ace.define("ace/lib/lang", [], function(e, t, n) {
                "use strict";
                t.last = function(e) {
                    return e[e.length - 1]
                }, t.stringReverse = function(e) {
                    return e.split("").reverse().join("")
                }, t.stringRepeat = function(e, t) {
                    for (var n = ""; t > 0;) 1 & t && (n += e), (t >>= 1) && (e += e);
                    return n
                };
                var i = /^\s\s*/,
                    o = /\s\s*$/;
                t.stringTrimLeft = function(e) {
                    return e.replace(i, "")
                }, t.stringTrimRight = function(e) {
                    return e.replace(o, "")
                }, t.copyObject = function(e) {
                    var t = {};
                    for (var n in e) t[n] = e[n];
                    return t
                }, t.copyArray = function(e) {
                    for (var t = [], n = 0, i = e.length; n < i; n++) e[n] && "object" == r(e[n]) ? t[n] = this.copyObject(e[n]) : t[n] = e[n];
                    return t
                }, t.deepCopy = function e(t) {
                    if ("object" !== r(t) || !t) return t;
                    var n;
                    if (Array.isArray(t)) {
                        n = [];
                        for (var i = 0; i < t.length; i++) n[i] = e(t[i]);
                        return n
                    }
                    if ("[object Object]" !== Object.prototype.toString.call(t)) return t;
                    for (var i in n = {}, t) n[i] = e(t[i]);
                    return n
                }, t.arrayToMap = function(e) {
                    for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = 1;
                    return t
                }, t.createMap = function(e) {
                    var t = Object.create(null);
                    for (var n in e) t[n] = e[n];
                    return t
                }, t.arrayRemove = function(e, t) {
                    for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1)
                }, t.escapeRegExp = function(e) {
                    return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
                }, t.escapeHTML = function(e) {
                    return ("" + e).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
                }, t.getMatchOffsets = function(e, t) {
                    var n = [];
                    return e.replace(t, function(e) {
                        n.push({
                            offset: arguments[arguments.length - 2],
                            length: e.length
                        })
                    }), n
                }, t.deferredCall = function(e) {
                    var t = null,
                        n = function() {
                            t = null, e()
                        },
                        r = function e(r) {
                            return e.cancel(), t = setTimeout(n, r || 0), e
                        };
                    return r.schedule = r, r.call = function() {
                        return this.cancel(), e(), r
                    }, r.cancel = function() {
                        return clearTimeout(t), t = null, r
                    }, r.isPending = function() {
                        return t
                    }, r
                }, t.delayedCall = function(e, t) {
                    var n = null,
                        r = function() {
                            n = null, e()
                        },
                        i = function(e) {
                            null == n && (n = setTimeout(r, e || t))
                        };
                    return i.delay = function(e) {
                        n && clearTimeout(n), n = setTimeout(r, e || t)
                    }, i.schedule = i, i.call = function() {
                        this.cancel(), e()
                    }, i.cancel = function() {
                        n && clearTimeout(n), n = null
                    }, i.isPending = function() {
                        return n
                    }, i
                }
            }), ace.define("ace/keyboard/textinput", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/event"),
                    i = e("../lib/useragent"),
                    o = e("../lib/dom"),
                    s = e("../lib/lang"),
                    a = i.isChrome < 18,
                    l = i.isIE,
                    c = i.isChrome > 63,
                    u = e("../lib/keys"),
                    h = u.KEY_MODS,
                    d = i.isIOS,
                    f = d ? /\s/ : /\n/;
                t.TextInput = function(e, t) {
                    var n = o.createElement("textarea");
                    n.className = "ace_text-input", n.setAttribute("wrap", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", !1), n.style.opacity = "0", e.insertBefore(n, e.firstChild);
                    var p = !1,
                        g = !1,
                        m = !1,
                        v = !1,
                        y = "";
                    i.isMobile || (n.style.fontSize = "1px");
                    var b = !1,
                        w = !1,
                        _ = "",
                        C = 0,
                        S = 0;
                    try {
                        var k = document.activeElement === n
                    } catch (e) {}
                    r.addListener(n, "blur", function(e) {
                        w || (t.onBlur(e), k = !1)
                    }), r.addListener(n, "focus", function(e) {
                        if (!w) {
                            if (k = !0, i.isEdge) try {
                                if (!document.hasFocus()) return
                            } catch (e) {}
                            t.onFocus(e), i.isEdge ? setTimeout(A) : A()
                        }
                    }), this.$focusScroll = !1, this.focus = function() {
                        if (y || c || "browser" == this.$focusScroll) return n.focus({
                            preventScroll: !0
                        });
                        var e = n.style.top;
                        n.style.position = "fixed", n.style.top = "0px";
                        try {
                            var t = 0 != n.getBoundingClientRect().top
                        } catch (e) {
                            return
                        }
                        var r = [];
                        if (t)
                            for (var i = n.parentElement; i && 1 == i.nodeType;) r.push(i), i.setAttribute("ace_nocontext", !0), i = !i.parentElement && i.getRootNode ? i.getRootNode().host : i.parentElement;
                        n.focus({
                            preventScroll: !0
                        }), t && r.forEach(function(e) {
                            e.removeAttribute("ace_nocontext")
                        }), setTimeout(function() {
                            n.style.position = "", "0px" == n.style.top && (n.style.top = e)
                        }, 0)
                    }, this.blur = function() {
                        n.blur()
                    }, this.isFocused = function() {
                        return k
                    }, t.on("beforeEndOperation", function() {
                        t.curOp && "insertstring" == t.curOp.command.name || (m && (_ = n.value = "", I()), A())
                    });
                    var A = d ? function(e) {
                        if (k && (!p || e) && !v) {
                            e || (e = "");
                            var r = "\n ab" + e + "cde fg\n";
                            r != n.value && (n.value = _ = r);
                            var i = 4 + (e.length || (t.selection.isEmpty() ? 0 : 1));
                            4 == C && S == i || n.setSelectionRange(4, i), C = 4, S = i
                        }
                    } : function() {
                        if (!m && !v && (k || $)) {
                            m = !0;
                            var e = t.selection,
                                r = e.getRange(),
                                i = e.cursor.row,
                                o = r.start.column,
                                s = r.end.column,
                                a = t.session.getLine(i);
                            if (r.start.row != i) {
                                var l = t.session.getLine(i - 1);
                                o = r.start.row < i - 1 ? 0 : o, s += l.length + 1, a = l + "\n" + a
                            } else if (r.end.row != i) {
                                var c = t.session.getLine(i + 1);
                                s = r.end.row > i + 1 ? c.length : s, s += a.length + 1, a = a + "\n" + c
                            }
                            a.length > 400 && (o < 400 && s < 400 ? a = a.slice(0, 400) : (a = "\n", o = 0, s = 1));
                            var u = a + "\n\n";
                            if (u != _ && (n.value = _ = u, C = S = u.length), $ && (C = n.selectionStart, S = n.selectionEnd), S != s || C != o || n.selectionEnd != S) try {
                                n.setSelectionRange(o, s), C = o, S = s
                            } catch (e) {}
                            m = !1
                        }
                    };
                    k && t.onFocus();
                    var x = null;
                    this.setInputHandler = function(e) {
                        x = e
                    }, this.getInputHandler = function() {
                        return x
                    };
                    var $ = !1,
                        T = function(e, r) {
                            if ($ && ($ = !1), g) return A(), e && t.onPaste(e), g = !1, "";
                            for (var i = n.selectionStart, o = n.selectionEnd, s = C, a = _.length - S, l = e, c = e.length - i, u = e.length - o, h = 0; s > 0 && _[h] == e[h];) h++, s--;
                            for (l = l.slice(h), h = 1; a > 0 && _.length - h > C - 1 && _[_.length - h] == e[e.length - h];) h++, a--;
                            return c -= h - 1, u -= h - 1, l = l.slice(0, l.length - h + 1), r || c != l.length || s || a || u ? (v = !0, l && !s && !a && !c && !u || b ? t.onTextInput(l) : t.onTextInput(l, {
                                extendLeft: s,
                                extendRight: a,
                                restoreStart: c,
                                restoreEnd: u
                            }), v = !1, _ = e, C = i, S = o, l) : ""
                        },
                        E = function(e) {
                            if (m) return D();
                            var t = n.value,
                                r = T(t, !0);
                            (t.length > 500 || f.test(r)) && A()
                        },
                        R = function e(t, n, r) {
                            var i = t.clipboardData || window.clipboardData;
                            if (i && !a) {
                                var o = l || r ? "Text" : "text/plain";
                                try {
                                    return n ? !1 !== i.setData(o, n) : i.getData(o)
                                } catch (t) {
                                    if (!r) return e(t, n, !0)
                                }
                            }
                        },
                        M = function(e, i) {
                            var o = t.getCopyText();
                            if (!o) return r.preventDefault(e);
                            R(e, o) ? (d && (A(o), p = o, setTimeout(function() {
                                p = !1
                            }, 10)), i ? t.onCut() : t.onCopy(), r.preventDefault(e)) : (p = !0, n.value = o, n.select(), setTimeout(function() {
                                p = !1, A(), i ? t.onCut() : t.onCopy()
                            }))
                        },
                        L = function(e) {
                            M(e, !0)
                        },
                        P = function(e) {
                            M(e, !1)
                        },
                        O = function(e) {
                            var o = R(e);
                            "string" == typeof o ? (o && t.onPaste(o, e), i.isIE && setTimeout(A), r.preventDefault(e)) : (n.value = "", g = !0)
                        };
                    r.addCommandKeyListener(n, t.onCommandKey.bind(t)), r.addListener(n, "select", function(e) {
                        m || (p ? p = !1 : function(e) {
                            return 0 === e.selectionStart && e.selectionEnd >= _.length && e.value === _ && _ && e.selectionEnd !== S
                        }(n) && (t.selectAll(), A()))
                    }), r.addListener(n, "input", E), r.addListener(n, "cut", L), r.addListener(n, "copy", P), r.addListener(n, "paste", O), "oncut" in n && "oncopy" in n && "onpaste" in n || r.addListener(e, "keydown", function(e) {
                        if ((!i.isMac || e.metaKey) && e.ctrlKey) switch (e.keyCode) {
                            case 67:
                                P(e);
                                break;
                            case 86:
                                O(e);
                                break;
                            case 88:
                                L(e)
                        }
                    });
                    var D = function() {
                            if (m && t.onCompositionUpdate && !t.$readOnly) {
                                if (b) return F();
                                if (m.useTextareaForIME) t.onCompositionUpdate(n.value);
                                else {
                                    var e = n.value;
                                    T(e), m.markerRange && (m.context && (m.markerRange.start.column = m.selectionStart = m.context.compositionStartOffset), m.markerRange.end.column = m.markerRange.start.column + S - m.selectionStart)
                                }
                            }
                        },
                        I = function(e) {
                            t.onCompositionEnd && !t.$readOnly && (m = !1, t.onCompositionEnd(), t.off("mousedown", F), e && E())
                        };

                    function F() {
                        w = !0, n.blur(), n.focus(), w = !1
                    }
                    var j, N = s.delayedCall(D, 50).schedule.bind(null, null);

                    function B() {
                        clearTimeout(j), j = setTimeout(function() {
                            y && (n.style.cssText = y, y = ""), t.renderer.$isMousePressed = !1, t.renderer.$keepTextAreaAtCursor && t.renderer.$moveTextAreaToCursor()
                        }, 0)
                    }
                    r.addListener(n, "compositionstart", function(e) {
                        if (!m && t.onCompositionStart && !t.$readOnly && (m = {}, !b)) {
                            setTimeout(D, 0), t.on("mousedown", F);
                            var r = t.getSelectionRange();
                            r.end.row = r.start.row, r.end.column = r.start.column, m.markerRange = r, m.selectionStart = C, t.onCompositionStart(m), m.useTextareaForIME ? (n.value = "", _ = "", C = 0, S = 0) : (n.msGetInputContext && (m.context = n.msGetInputContext()), n.getInputContext && (m.context = n.getInputContext()))
                        }
                    }), r.addListener(n, "compositionupdate", D), r.addListener(n, "keyup", function(e) {
                        27 == e.keyCode && n.value.length < n.selectionStart && (m || (_ = n.value), C = S = -1, A()), N()
                    }), r.addListener(n, "keydown", N), r.addListener(n, "compositionend", I), this.getElement = function() {
                        return n
                    }, this.setCommandMode = function(e) {
                        b = e, n.readOnly = !1
                    }, this.setReadOnly = function(e) {
                        b || (n.readOnly = e)
                    }, this.setCopyWithEmptySelection = function(e) {}, this.onContextMenu = function(e) {
                        $ = !0, A(), t._emit("nativecontextmenu", {
                            target: t,
                            domEvent: e
                        }), this.moveToMouse(e, !0)
                    }, this.moveToMouse = function(e, s) {
                        y || (y = n.style.cssText), n.style.cssText = (s ? "z-index:100000;" : "") + (i.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (C + S) * t.renderer.characterWidth * .5 + "px;";
                        var a = t.container.getBoundingClientRect(),
                            l = o.computedStyle(t.container),
                            c = a.top + (parseInt(l.borderTopWidth) || 0),
                            u = a.left + (parseInt(a.borderLeftWidth) || 0),
                            h = a.bottom - c - n.clientHeight - 2,
                            d = function(e) {
                                o.translate(n, e.clientX - u - 2, Math.min(e.clientY - c - 2, h))
                            };
                        d(e), "mousedown" == e.type && (t.renderer.$isMousePressed = !0, clearTimeout(j), i.isWin && r.capture(t.container, d, B))
                    }, this.onContextMenuClose = B;
                    var H = function(e) {
                        t.textInput.onContextMenu(e), B()
                    };
                    r.addListener(n, "mouseup", H), r.addListener(n, "mousedown", function(e) {
                        e.preventDefault(), B()
                    }), r.addListener(t.renderer.scroller, "contextmenu", H), r.addListener(n, "contextmenu", H), d && function(e, t, n) {
                        var r = null,
                            i = !1;
                        n.addEventListener("keydown", function(e) {
                            r && clearTimeout(r), i = !0
                        }, !0), n.addEventListener("keyup", function(e) {
                            r = setTimeout(function() {
                                i = !1
                            }, 100)
                        }, !0);
                        var o = function(e) {
                            if (document.activeElement === n && !(i || m || t.$mouseHandler.isMousePressed || p)) {
                                var r = n.selectionStart,
                                    o = n.selectionEnd,
                                    s = null,
                                    a = 0;
                                console.log(r, o), 0 == r ? s = u.up : 1 == r ? s = u.home : o > S && "\n" == _[o] ? s = u.end : r < C && " " == _[r - 1] ? (s = u.left, a = h.option) : r < C || r == C && S != C && r == o ? s = u.left : o > S && _.slice(0, o).split("\n").length > 2 ? s = u.down : o > S && " " == _[o - 1] ? (s = u.right, a = h.option) : (o > S || o == S && S != C && r == o) && (s = u.right), r !== o && (a |= h.shift), s && (t.onCommandKey(null, a, s), C = r, S = o, A(""))
                            }
                        };
                        document.addEventListener("selectionchange", o), t.on("destroy", function() {
                            document.removeEventListener("selectionchange", o)
                        })
                    }(0, t, n)
                }
            }), ace.define("ace/mouse/default_handlers", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/useragent");

                function i(e) {
                    e.$clickSelection = null;
                    var t = e.editor;
                    t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
                    ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"].forEach(function(t) {
                        e[t] = this[t]
                    }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
                }

                function o(e, t) {
                    if (e.start.row == e.end.row) var n = 2 * t.column - e.start.column - e.end.column;
                    else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column) n = 2 * t.row - e.start.row - e.end.row;
                    else var n = t.column - 4;
                    return n < 0 ? {
                        cursor: e.start,
                        anchor: e.end
                    } : {
                        cursor: e.end,
                        anchor: e.start
                    }
                }(function() {
                    this.onMouseDown = function(e) {
                        var t = e.inSelection(),
                            n = e.getDocumentPosition();
                        this.mousedownEvent = e;
                        var i = this.editor,
                            o = e.getButton();
                        return 0 !== o ? ((i.getSelectionRange().isEmpty() || 1 == o) && i.selection.moveToPosition(n), void(2 == o && (i.textInput.onContextMenu(e.domEvent), r.isMozilla || e.preventDefault()))) : (this.mousedownEvent.time = Date.now(), !t || i.isFocused() || (i.focus(), !this.$focusTimeout || this.$clickSelection || i.inMultiSelectMode) ? (this.captureMouse(e), this.startSelect(n, e.domEvent._clicks > 1), e.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(e)))
                    }, this.startSelect = function(e, t) {
                        e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
                        var n = this.editor;
                        this.mousedownEvent && (this.mousedownEvent.getShiftKey() ? n.selection.selectToPosition(e) : t || n.selection.moveToPosition(e), t || this.select(), n.renderer.scroller.setCapture && n.renderer.scroller.setCapture(), n.setStyle("ace_selecting"), this.setState("select"))
                    }, this.select = function() {
                        var e, t = this.editor,
                            n = t.renderer.screenToTextCoordinates(this.x, this.y);
                        if (this.$clickSelection) {
                            var r = this.$clickSelection.comparePoint(n);
                            if (-1 == r) e = this.$clickSelection.end;
                            else if (1 == r) e = this.$clickSelection.start;
                            else {
                                var i = o(this.$clickSelection, n);
                                n = i.cursor, e = i.anchor
                            }
                            t.selection.setSelectionAnchor(e.row, e.column)
                        }
                        t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView()
                    }, this.extendSelectionBy = function(e) {
                        var t, n = this.editor,
                            r = n.renderer.screenToTextCoordinates(this.x, this.y),
                            i = n.selection[e](r.row, r.column);
                        if (this.$clickSelection) {
                            var s = this.$clickSelection.comparePoint(i.start),
                                a = this.$clickSelection.comparePoint(i.end);
                            if (-1 == s && a <= 0) t = this.$clickSelection.end, i.end.row == r.row && i.end.column == r.column || (r = i.start);
                            else if (1 == a && s >= 0) t = this.$clickSelection.start, i.start.row == r.row && i.start.column == r.column || (r = i.end);
                            else if (-1 == s && 1 == a) r = i.end, t = i.start;
                            else {
                                var l = o(this.$clickSelection, r);
                                r = l.cursor, t = l.anchor
                            }
                            n.selection.setSelectionAnchor(t.row, t.column)
                        }
                        n.selection.selectToPosition(r), n.renderer.scrollCursorIntoView()
                    }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
                        this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture()
                    }, this.focusWait = function() {
                        var e, t, n, r, i = (e = this.mousedownEvent.x, t = this.mousedownEvent.y, n = this.x, r = this.y, Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2))),
                            o = Date.now();
                        (i > 0 || o - this.mousedownEvent.time > this.$focusTimeout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
                    }, this.onDoubleClick = function(e) {
                        var t = e.getDocumentPosition(),
                            n = this.editor,
                            r = n.session.getBracketRange(t);
                        r ? (r.isEmpty() && (r.start.column--, r.end.column++), this.setState("select")) : (r = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords")), this.$clickSelection = r, this.select()
                    }, this.onTripleClick = function(e) {
                        var t = e.getDocumentPosition(),
                            n = this.editor;
                        this.setState("selectByLines");
                        var r = n.getSelectionRange();
                        r.isMultiLine() && r.contains(t.row, t.column) ? (this.$clickSelection = n.selection.getLineRange(r.start.row), this.$clickSelection.end = n.selection.getLineRange(r.end.row).end) : this.$clickSelection = n.selection.getLineRange(t.row), this.select()
                    }, this.onQuadClick = function(e) {
                        var t = this.editor;
                        t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll")
                    }, this.onMouseWheel = function(e) {
                        if (!e.getAccelKey()) {
                            e.getShiftKey() && e.wheelY && !e.wheelX && (e.wheelX = e.wheelY, e.wheelY = 0);
                            var t = this.editor;
                            this.$lastScroll || (this.$lastScroll = {
                                t: 0,
                                vx: 0,
                                vy: 0,
                                allowed: 0
                            });
                            var n = this.$lastScroll,
                                r = e.domEvent.timeStamp,
                                i = r - n.t,
                                o = i ? e.wheelX / i : n.vx,
                                s = i ? e.wheelY / i : n.vy;
                            i < 550 && (o = (o + n.vx) / 2, s = (s + n.vy) / 2);
                            var a = Math.abs(o / s),
                                l = !1;
                            if (a >= 1 && t.renderer.isScrollableBy(e.wheelX * e.speed, 0) && (l = !0), a <= 1 && t.renderer.isScrollableBy(0, e.wheelY * e.speed) && (l = !0), l) n.allowed = r;
                            else if (r - n.allowed < 550) {
                                Math.abs(o) <= 1.5 * Math.abs(n.vx) && Math.abs(s) <= 1.5 * Math.abs(n.vy) ? (l = !0, n.allowed = r) : n.allowed = 0
                            }
                            return n.t = r, n.vx = o, n.vy = s, l ? (t.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
                        }
                    }
                }).call(i.prototype), t.DefaultHandlers = i
            }), ace.define("ace/tooltip", [], function(e, t, n) {
                "use strict";
                e("./lib/oop");
                var r = e("./lib/dom");

                function i(e) {
                    this.isOpen = !1, this.$element = null, this.$parentNode = e
                }(function() {
                    this.$init = function() {
                        return this.$element = r.createElement("div"), this.$element.className = "ace_tooltip", this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element
                    }, this.getElement = function() {
                        return this.$element || this.$init()
                    }, this.setText = function(e) {
                        this.getElement().textContent = e
                    }, this.setHtml = function(e) {
                        this.getElement().innerHTML = e
                    }, this.setPosition = function(e, t) {
                        this.getElement().style.left = e + "px", this.getElement().style.top = t + "px"
                    }, this.setClassName = function(e) {
                        r.addCssClass(this.getElement(), e)
                    }, this.show = function(e, t, n) {
                        null != e && this.setText(e), null != t && null != n && this.setPosition(t, n), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0)
                    }, this.hide = function() {
                        this.isOpen && (this.getElement().style.display = "none", this.isOpen = !1)
                    }, this.getHeight = function() {
                        return this.getElement().offsetHeight
                    }, this.getWidth = function() {
                        return this.getElement().offsetWidth
                    }, this.destroy = function() {
                        this.isOpen = !1, this.$element && this.$element.parentNode && this.$element.parentNode.removeChild(this.$element)
                    }
                }).call(i.prototype), t.Tooltip = i
            }), ace.define("ace/mouse/default_gutter_handler", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom"),
                    i = e("../lib/oop"),
                    o = e("../lib/event"),
                    s = e("../tooltip").Tooltip;

                function a(e) {
                    s.call(this, e)
                }
                i.inherits(a, s),
                    function() {
                        this.setPosition = function(e, t) {
                            var n = window.innerWidth || document.documentElement.clientWidth,
                                r = window.innerHeight || document.documentElement.clientHeight,
                                i = this.getWidth(),
                                o = this.getHeight();
                            (e += 15) + i > n && (e -= e + i - n), (t += 15) + o > r && (t -= 20 + o), s.prototype.setPosition.call(this, e, t)
                        }
                    }.call(a.prototype), t.GutterHandler = function(e) {
                    var t, n, i, s = e.editor,
                        l = s.renderer.$gutterLayer,
                        c = new a(s.container);

                    function u() {
                        t && (t = clearTimeout(t)), i && (c.hide(), i = null, s._signal("hideGutterTooltip", c), s.removeEventListener("mousewheel", u))
                    }

                    function h(e) {
                        c.setPosition(e.x, e.y)
                    }
                    e.editor.setDefaultHandler("guttermousedown", function(t) {
                        if (s.isFocused() && 0 == t.getButton() && "foldWidgets" != l.getRegion(t)) {
                            var n = t.getDocumentPosition().row,
                                r = s.session.selection;
                            if (t.getShiftKey()) r.selectTo(n, 0);
                            else {
                                if (2 == t.domEvent.detail) return s.selectAll(), t.preventDefault();
                                e.$clickSelection = s.selection.getLineRange(n)
                            }
                            return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault()
                        }
                    }), e.editor.setDefaultHandler("guttermousemove", function(o) {
                        var a = o.domEvent.target || o.domEvent.srcElement;
                        if (r.hasCssClass(a, "ace_fold-widget")) return u();
                        i && e.$tooltipFollowsMouse && h(o), n = o, t || (t = setTimeout(function() {
                            t = null, n && !e.isMousePressed ? function() {
                                var t = n.getDocumentPosition().row,
                                    r = l.$annotations[t];
                                if (!r) return u();
                                if (t == s.session.getLength()) {
                                    var o = s.renderer.pixelToScreenCoordinates(0, n.y).row,
                                        a = n.$pos;
                                    if (o > s.session.documentToScreenRow(a.row, a.column)) return u()
                                }
                                if (i != r)
                                    if (i = r.text.join("<br/>"), c.setHtml(i), c.show(), s._signal("showGutterTooltip", c), s.on("mousewheel", u), e.$tooltipFollowsMouse) h(n);
                                    else {
                                        var d = n.domEvent.target.getBoundingClientRect(),
                                            f = c.getElement().style;
                                        f.left = d.right + "px", f.top = d.bottom + "px"
                                    }
                            }() : u()
                        }, 50))
                    }), o.addListener(s.renderer.$gutter, "mouseout", function(e) {
                        n = null, i && !t && (t = setTimeout(function() {
                            t = null, u()
                        }, 50))
                    }), s.on("changeSession", u)
                }
            }), ace.define("ace/mouse/mouse_event", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/event"),
                    i = e("../lib/useragent"),
                    o = t.MouseEvent = function(e, t) {
                        this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
                    };
                (function() {
                    this.stopPropagation = function() {
                        r.stopPropagation(this.domEvent), this.propagationStopped = !0
                    }, this.preventDefault = function() {
                        r.preventDefault(this.domEvent), this.defaultPrevented = !0
                    }, this.stop = function() {
                        this.stopPropagation(), this.preventDefault()
                    }, this.getDocumentPosition = function() {
                        return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
                    }, this.inSelection = function() {
                        if (null !== this.$inSelection) return this.$inSelection;
                        var e = this.editor.getSelectionRange();
                        if (e.isEmpty()) this.$inSelection = !1;
                        else {
                            var t = this.getDocumentPosition();
                            this.$inSelection = e.contains(t.row, t.column)
                        }
                        return this.$inSelection
                    }, this.getButton = function() {
                        return r.getButton(this.domEvent)
                    }, this.getShiftKey = function() {
                        return this.domEvent.shiftKey
                    }, this.getAccelKey = i.isMac ? function() {
                        return this.domEvent.metaKey
                    } : function() {
                        return this.domEvent.ctrlKey
                    }
                }).call(o.prototype)
            }), ace.define("ace/mouse/dragdrop_handler", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom"),
                    i = e("../lib/event"),
                    o = e("../lib/useragent"),
                    s = 200,
                    a = 200,
                    l = 5;

                function c(e) {
                    var t = e.editor,
                        n = r.createElement("img");
                    n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", o.isOpera && (n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
                    ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"].forEach(function(t) {
                        e[t] = this[t]
                    }, this), t.addEventListener("mousedown", this.onMouseDown.bind(e));
                    var c, h, d, f, p, g, m, v, y, b, w, _ = t.container,
                        C = 0;

                    function S() {
                        var e = g;
                        (function(e, n) {
                            var r = Date.now(),
                                i = !n || e.row != n.row,
                                o = !n || e.column != n.column;
                            !b || i || o ? (t.moveCursorToPosition(e), b = r, w = {
                                x: h,
                                y: d
                            }) : u(w.x, w.y, h, d) > l ? b = null : r - b >= a && (t.renderer.scrollCursorIntoView(), b = null)
                        })(g = t.renderer.screenToTextCoordinates(h, d), e),
                            function(e, n) {
                                var r = Date.now(),
                                    i = t.renderer.layerConfig.lineHeight,
                                    o = t.renderer.layerConfig.characterWidth,
                                    a = t.renderer.scroller.getBoundingClientRect(),
                                    l = {
                                        x: {
                                            left: h - a.left,
                                            right: a.right - h
                                        },
                                        y: {
                                            top: d - a.top,
                                            bottom: a.bottom - d
                                        }
                                    },
                                    c = Math.min(l.x.left, l.x.right),
                                    u = Math.min(l.y.top, l.y.bottom),
                                    f = {
                                        row: e.row,
                                        column: e.column
                                    };
                                c / o <= 2 && (f.column += l.x.left < l.x.right ? -3 : 2), u / i <= 1 && (f.row += l.y.top < l.y.bottom ? -1 : 1);
                                var p = e.row != f.row,
                                    g = e.column != f.column,
                                    m = !n || e.row != n.row;
                                p || g && !m ? y ? r - y >= s && t.renderer.scrollCursorIntoView(f) : y = r : y = null
                            }(g, e)
                    }

                    function k() {
                        p = t.selection.toOrientedRange(), c = t.session.addMarker(p, "ace_selection", t.getSelectionStyle()), t.clearSelection(), t.isFocused() && t.renderer.$cursorLayer.setBlinking(!1), clearInterval(f), S(), f = setInterval(S, 20), C = 0, i.addListener(document, "mousemove", $)
                    }

                    function A() {
                        clearInterval(f), t.session.removeMarker(c), c = null, t.selection.fromOrientedRange(p), t.isFocused() && !v && t.$resetCursorStyle(), p = null, g = null, C = 0, y = null, b = null, i.removeListener(document, "mousemove", $)
                    }
                    this.onDragStart = function(e) {
                        if (this.cancelDrag || !_.draggable) {
                            var r = this;
                            return setTimeout(function() {
                                r.startSelect(), r.captureMouse(e)
                            }, 0), e.preventDefault()
                        }
                        p = t.getSelectionRange();
                        var i = e.dataTransfer;
                        i.effectAllowed = t.getReadOnly() ? "copy" : "copyMove", o.isOpera && (t.container.appendChild(n), n.scrollTop = 0), i.setDragImage && i.setDragImage(n, 0, 0), o.isOpera && t.container.removeChild(n), i.clearData(), i.setData("Text", t.session.getTextRange()), v = !0, this.setState("drag")
                    }, this.onDragEnd = function(e) {
                        if (_.draggable = !1, v = !1, this.setState(null), !t.getReadOnly()) {
                            var n = e.dataTransfer.dropEffect;
                            m || "move" != n || t.session.remove(t.getSelectionRange()), t.$resetCursorStyle()
                        }
                        this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("")
                    }, this.onDragEnter = function(e) {
                        if (!t.getReadOnly() && T(e.dataTransfer)) return h = e.clientX, d = e.clientY, c || k(), C++, e.dataTransfer.dropEffect = m = E(e), i.preventDefault(e)
                    }, this.onDragOver = function(e) {
                        if (!t.getReadOnly() && T(e.dataTransfer)) return h = e.clientX, d = e.clientY, c || (k(), C++), null !== x && (x = null), e.dataTransfer.dropEffect = m = E(e), i.preventDefault(e)
                    }, this.onDragLeave = function(e) {
                        if (--C <= 0 && c) return A(), m = null, i.preventDefault(e)
                    }, this.onDrop = function(e) {
                        if (g) {
                            var n = e.dataTransfer;
                            if (v) switch (m) {
                                case "move":
                                    p = p.contains(g.row, g.column) ? {
                                        start: g,
                                        end: g
                                    } : t.moveText(p, g);
                                    break;
                                case "copy":
                                    p = t.moveText(p, g, !0)
                            } else {
                                var r = n.getData("Text");
                                p = {
                                    start: g,
                                    end: t.session.insert(g, r)
                                }, t.focus(), m = null
                            }
                            return A(), i.preventDefault(e)
                        }
                    }, i.addListener(_, "dragstart", this.onDragStart.bind(e)), i.addListener(_, "dragend", this.onDragEnd.bind(e)), i.addListener(_, "dragenter", this.onDragEnter.bind(e)), i.addListener(_, "dragover", this.onDragOver.bind(e)), i.addListener(_, "dragleave", this.onDragLeave.bind(e)), i.addListener(_, "drop", this.onDrop.bind(e));
                    var x = null;

                    function $() {
                        null == x && (x = setTimeout(function() {
                            null != x && c && A()
                        }, 20))
                    }

                    function T(e) {
                        var t = e.types;
                        return !t || Array.prototype.some.call(t, function(e) {
                            return "text/plain" == e || "Text" == e
                        })
                    }

                    function E(e) {
                        var t = ["copy", "copymove", "all", "uninitialized"],
                            n = o.isMac ? e.altKey : e.ctrlKey,
                            r = "uninitialized";
                        try {
                            r = e.dataTransfer.effectAllowed.toLowerCase()
                        } catch (e) {}
                        var i = "none";
                        return n && t.indexOf(r) >= 0 ? i = "copy" : ["move", "copymove", "linkmove", "all", "uninitialized"].indexOf(r) >= 0 ? i = "move" : t.indexOf(r) >= 0 && (i = "copy"), i
                    }
                }

                function u(e, t, n, r) {
                    return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2))
                }(function() {
                    this.dragWait = function() {
                        Date.now() - this.mousedownEvent.time > this.editor.getDragDelay() && this.startDrag()
                    }, this.dragWaitEnd = function() {
                        this.editor.container.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd()
                    }, this.dragReadyEnd = function(e) {
                        this.editor.$resetCursorStyle(), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd()
                    }, this.startDrag = function() {
                        this.cancelDrag = !1;
                        var e = this.editor;
                        e.container.draggable = !0, e.renderer.$cursorLayer.setBlinking(!1), e.setStyle("ace_dragging");
                        var t = o.isWin ? "default" : "move";
                        e.renderer.setCursorStyle(t), this.setState("dragReady")
                    }, this.onMouseDrag = function(e) {
                        var t = this.editor.container;
                        o.isIE && "dragReady" == this.state && (u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 3 && t.dragDrop());
                        "dragWait" === this.state && (u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 0 && (t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition())))
                    }, this.onMouseDown = function(e) {
                        if (this.$dragEnabled) {
                            this.mousedownEvent = e;
                            var t = this.editor,
                                n = e.inSelection(),
                                r = e.getButton();
                            if (1 === (e.domEvent.detail || 1) && 0 === r && n) {
                                if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey())) return;
                                this.mousedownEvent.time = Date.now();
                                var i = e.domEvent.target || e.domEvent.srcElement;
                                if ("unselectable" in i && (i.unselectable = "on"), t.getDragDelay()) {
                                    if (o.isWebKit) this.cancelDrag = !0, t.container.draggable = !0;
                                    this.setState("dragWait")
                                } else this.startDrag();
                                this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0
                            }
                        }
                    }
                }).call(c.prototype), t.DragdropHandler = c
            }), ace.define("ace/mouse/touch_handler", [], function(e, t, n) {
                "use strict";
                var r = e("./mouse_event").MouseEvent;
                t.addTouchListeners = function(e, t) {
                    var n, i, o, s, a, l, c, u, h = "scroll",
                        d = 0,
                        f = 0,
                        p = 0,
                        g = 0;

                    function m() {
                        a = null, clearTimeout(a), t.selection.isEmpty() && t.selection.moveToPosition(c), h = "wait"
                    }
                    e.addEventListener("contextmenu", function(e) {
                        u && t.textInput.getElement().focus()
                    }), e.addEventListener("touchstart", function(e) {
                        var l = e.touches;
                        if (a || l.length > 1) return clearTimeout(a), a = null, void(h = "zoom");
                        u = t.$mouseHandler.isMousePressed = !0;
                        var v = l[0];
                        n = v.clientX, i = v.clientY, p = g = 0, e.clientX = v.clientX, e.clientY = v.clientY;
                        var y = e.timeStamp;
                        s = y;
                        var b = new r(e, t);
                        if (c = b.getDocumentPosition(), y - o < 500 && 1 == l.length && !d) f++, e.preventDefault(), e.button = 0,
                            function() {
                                a = null, clearTimeout(a), t.selection.moveToPosition(c);
                                var e = f >= 2 ? t.selection.getLineRange(c.row) : t.session.getBracketRange(c);
                                e && !e.isEmpty() ? t.selection.setRange(e) : t.selection.selectWord(), h = "wait"
                            }();
                        else {
                            f = 0, a = setTimeout(m, 450);
                            var w = t.selection.cursor,
                                _ = t.selection.isEmpty() ? w : t.selection.anchor,
                                C = t.renderer.$cursorLayer.getPixelPosition(w, !0),
                                S = t.renderer.$cursorLayer.getPixelPosition(_, !0),
                                k = t.renderer.scroller.getBoundingClientRect(),
                                A = t.renderer.layerConfig.lineHeight,
                                x = t.renderer.layerConfig.lineHeight,
                                $ = function(e, t) {
                                    return (e /= x) * e + (t = t / A - .75) * t
                                },
                                T = $(e.clientX - k.left - C.left, e.clientY - k.top - C.top),
                                E = $(e.clientX - k.left - S.left, e.clientY - k.top - S.top);
                            T < 3.5 && E < 3.5 && (h = T > E ? "cursor" : "anchor"), h = E < 3.5 ? "anchor" : T < 3.5 ? "cursor" : "scroll"
                        }
                        o = y
                    }), e.addEventListener("touchend", function(e) {
                        u = t.$mouseHandler.isMousePressed = !1, l && clearInterval(l), "zoom" == h ? (h = "", d = 0) : a ? (t.selection.moveToPosition(c), d = 0) : "scroll" == h && (d += 60, l = setInterval(function() {
                            d-- <= 0 && (clearInterval(l), l = null), Math.abs(p) < .01 && (p = 0), Math.abs(g) < .01 && (g = 0), d < 20 && (p *= .9), d < 20 && (g *= .9), t.renderer.scrollBy(10 * p, 10 * g)
                        }, 10), e.preventDefault()), clearTimeout(a), a = null
                    }), e.addEventListener("touchmove", function(e) {
                        a && (clearTimeout(a), a = null);
                        var o = e.touches;
                        if (!(o.length > 1 || "zoom" == h)) {
                            var l = o[0],
                                c = n - l.clientX,
                                u = i - l.clientY;
                            if ("wait" == h) {
                                if (!(c * c + u * u > 4)) return e.preventDefault();
                                h = "cursor"
                            }
                            n = l.clientX, i = l.clientY, e.clientX = l.clientX, e.clientY = l.clientY;
                            var d = e.timeStamp,
                                f = d - s;
                            if (s = d, "scroll" == h) {
                                var m = new r(e, t);
                                m.speed = 1, m.wheelX = c, m.wheelY = u, 10 * Math.abs(c) < Math.abs(u) && (c = 0), 10 * Math.abs(u) < Math.abs(c) && (u = 0), 0 != f && (p = c / f, g = u / f), t._emit("mousewheel", m), m.propagationStopped || (p = g = 0)
                            } else {
                                var v = new r(e, t).getDocumentPosition();
                                "cursor" == h ? t.selection.moveCursorToPosition(v) : "anchor" == h && t.selection.setSelectionAnchor(v.row, v.column), t.renderer.scrollCursorIntoView(v), e.preventDefault()
                            }
                        }
                    })
                }
            }), ace.define("ace/lib/net", [], function(e, t, n) {
                "use strict";
                var r = e("./dom");
                t.get = function(e, t) {
                    var n = new XMLHttpRequest;
                    n.open("GET", e, !0), n.onreadystatechange = function() {
                        4 === n.readyState && t(n.responseText)
                    }, n.send(null)
                }, t.loadScript = function(e, t) {
                    var n = r.getDocumentHead(),
                        i = document.createElement("script");
                    i.src = e, n.appendChild(i), i.onload = i.onreadystatechange = function(e, n) {
                        !n && i.readyState && "loaded" != i.readyState && "complete" != i.readyState || (i = i.onload = i.onreadystatechange = null, n || t())
                    }
                }, t.qualifyURL = function(e) {
                    var t = document.createElement("a");
                    return t.href = e, t.href
                }
            }), ace.define("ace/lib/event_emitter", [], function(e, t, n) {
                "use strict";
                var i = {},
                    o = function() {
                        this.propagationStopped = !0
                    },
                    s = function() {
                        this.defaultPrevented = !0
                    };
                i._emit = i._dispatchEvent = function(e, t) {
                    this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
                    var n = this._eventRegistry[e] || [],
                        i = this._defaultHandlers[e];
                    if (n.length || i) {
                        "object" == r(t) && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = o), t.preventDefault || (t.preventDefault = s), n = n.slice();
                        for (var a = 0; a < n.length && (n[a](t, this), !t.propagationStopped); a++);
                        return i && !t.defaultPrevented ? i(t, this) : void 0
                    }
                }, i._signal = function(e, t) {
                    var n = (this._eventRegistry || {})[e];
                    if (n) {
                        n = n.slice();
                        for (var r = 0; r < n.length; r++) n[r](t, this)
                    }
                }, i.once = function(e, t) {
                    var n = this;
                    if (this.addEventListener(e, function r() {
                        n.removeEventListener(e, r), t.apply(null, arguments)
                    }), !t) return new Promise(function(e) {
                        t = e
                    })
                }, i.setDefaultHandler = function(e, t) {
                    var n = this._defaultHandlers;
                    if (n || (n = this._defaultHandlers = {
                        _disabled_: {}
                    }), n[e]) {
                        var r = n[e],
                            i = n._disabled_[e];
                        i || (n._disabled_[e] = i = []), i.push(r);
                        var o = i.indexOf(t); - 1 != o && i.splice(o, 1)
                    }
                    n[e] = t
                }, i.removeDefaultHandler = function(e, t) {
                    var n = this._defaultHandlers;
                    if (n) {
                        var r = n._disabled_[e];
                        if (n[e] == t) r && this.setDefaultHandler(e, r.pop());
                        else if (r) {
                            var i = r.indexOf(t); - 1 != i && r.splice(i, 1)
                        }
                    }
                }, i.on = i.addEventListener = function(e, t, n) {
                    this._eventRegistry = this._eventRegistry || {};
                    var r = this._eventRegistry[e];
                    return r || (r = this._eventRegistry[e] = []), -1 == r.indexOf(t) && r[n ? "unshift" : "push"](t), t
                }, i.off = i.removeListener = i.removeEventListener = function(e, t) {
                    this._eventRegistry = this._eventRegistry || {};
                    var n = this._eventRegistry[e];
                    if (n) {
                        var r = n.indexOf(t); - 1 !== r && n.splice(r, 1)
                    }
                }, i.removeAllListeners = function(e) {
                    this._eventRegistry && (this._eventRegistry[e] = [])
                }, t.EventEmitter = i
            }), ace.define("ace/lib/app_config", [], function(e, t, n) {
                var i = e("./oop"),
                    o = e("./event_emitter").EventEmitter,
                    s = {
                        setOptions: function(e) {
                            Object.keys(e).forEach(function(t) {
                                this.setOption(t, e[t])
                            }, this)
                        },
                        getOptions: function(e) {
                            var t = {};
                            if (e) Array.isArray(e) || (t = e, e = Object.keys(t));
                            else {
                                var n = this.$options;
                                e = Object.keys(n).filter(function(e) {
                                    return !n[e].hidden
                                })
                            }
                            return e.forEach(function(e) {
                                t[e] = this.getOption(e)
                            }, this), t
                        },
                        setOption: function(e, t) {
                            if (this["$" + e] !== t) {
                                var n = this.$options[e];
                                if (!n) return a('misspelled option "' + e + '"');
                                if (n.forwardTo) return this[n.forwardTo] && this[n.forwardTo].setOption(e, t);
                                n.handlesSet || (this["$" + e] = t), n && n.set && n.set.call(this, t)
                            }
                        },
                        getOption: function(e) {
                            var t = this.$options[e];
                            return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : a('misspelled option "' + e + '"')
                        }
                    };

                function a(e) {
                    "undefined" != typeof console && console.warn && console.warn.apply(console, arguments)
                }

                function l(e, t) {
                    var n = new Error(e);
                    n.data = t, "object" == ("undefined" == typeof console ? "undefined" : r(console)) && console.error && console.error(n), setTimeout(function() {
                        throw n
                    })
                }
                var c = function() {
                    this.$defaultOptions = {}
                };
                (function() {
                    i.implement(this, o), this.defineOptions = function(e, t, n) {
                        return e.$options || (this.$defaultOptions[t] = e.$options = {}), Object.keys(n).forEach(function(t) {
                            var r = n[t];
                            "string" == typeof r && (r = {
                                forwardTo: r
                            }), r.name || (r.name = t), e.$options[r.name] = r, "initialValue" in r && (e["$" + r.name] = r.initialValue)
                        }), i.implement(e, s), this
                    }, this.resetOptions = function(e) {
                        Object.keys(e.$options).forEach(function(t) {
                            var n = e.$options[t];
                            "value" in n && e.setOption(t, n.value)
                        })
                    }, this.setDefaultValue = function(e, t, n) {
                        if (!e) {
                            for (e in this.$defaultOptions)
                                if (this.$defaultOptions[e][t]) break;
                            if (!this.$defaultOptions[e][t]) return !1
                        }
                        var r = this.$defaultOptions[e] || (this.$defaultOptions[e] = {});
                        r[t] && (r.forwardTo ? this.setDefaultValue(r.forwardTo, t, n) : r[t].value = n)
                    }, this.setDefaultValues = function(e, t) {
                        Object.keys(t).forEach(function(n) {
                            this.setDefaultValue(e, n, t[n])
                        }, this)
                    }, this.warn = a, this.reportError = l
                }).call(c.prototype), t.AppConfig = c
            }), ace.define("ace/config", [], function(e, t, r) {
                var i = e("./lib/lang"),
                    o = (e("./lib/oop"), e("./lib/net")),
                    s = e("./lib/app_config").AppConfig;
                r.exports = t = new s;
                var a = function() {
                        return this || "undefined" != typeof window && window
                    }(),
                    l = {
                        packaged: !1,
                        workerPath: null,
                        modePath: null,
                        themePath: null,
                        basePath: "",
                        suffix: ".js",
                        $moduleUrls: {},
                        loadWorkerFromBlob: !0,
                        sharedPopups: !1
                    };
                t.get = function(e) {
                    if (!l.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
                    return l[e]
                }, t.set = function(e, t) {
                    if (l.hasOwnProperty(e)) l[e] = t;
                    else if (0 == this.setDefaultValue("", e, t)) throw new Error("Unknown config key: " + e)
                }, t.all = function() {
                    return i.copyObject(l)
                }, t.$modes = {}, t.moduleUrl = function(e, t) {
                    if (l.$moduleUrls[e]) return l.$moduleUrls[e];
                    var n = e.split("/"),
                        r = "snippets" == (t = t || n[n.length - 2] || "") ? "/" : "-",
                        i = n[n.length - 1];
                    if ("worker" == t && "-" == r) {
                        var o = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
                        i = i.replace(o, "")
                    }(!i || i == t) && n.length > 1 && (i = n[n.length - 2]);
                    var s = l[t + "Path"];
                    return null == s ? s = l.basePath : "/" == r && (t = r = ""), s && "/" != s.slice(-1) && (s += "/"), s + t + r + i + this.get("suffix")
                }, t.setModuleUrl = function(e, t) {
                    return l.$moduleUrls[e] = t
                }, t.$loading = {}, t.loadModule = function(n, r) {
                    var i, s;
                    Array.isArray(n) && (s = n[0], n = n[1]);
                    try {
                        i = e(n)
                    } catch (e) {}
                    if (i && !t.$loading[n]) return r && r(i);
                    if (t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(r), !(t.$loading[n].length > 1)) {
                        var a = function() {
                            e([n], function(e) {
                                t._emit("load.module", {
                                    name: n,
                                    module: e
                                });
                                var r = t.$loading[n];
                                t.$loading[n] = null, r.forEach(function(t) {
                                    t && t(e)
                                })
                            })
                        };
                        if (!t.get("packaged")) return a();
                        o.loadScript(t.moduleUrl(n, s), a), c()
                    }
                };
                var c = function() {
                    l.basePath || l.workerPath || l.modePath || l.themePath || Object.keys(l.$moduleUrls).length || (console.error("Unable to infer path to ace from script src,", "use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes", "or with webpack use ace/webpack-resolver"), c = function() {})
                };

                function u(i) {
                    if (a && a.document) {
                        l.packaged = i || e.packaged || r.packaged || a.define && n(21).packaged;
                        for (var o, s = {}, c = "", u = document.currentScript || document._currentScript, h = (u && u.ownerDocument || document).getElementsByTagName("script"), d = 0; d < h.length; d++) {
                            var f = h[d],
                                p = f.src || f.getAttribute("src");
                            if (p) {
                                for (var g = f.attributes, m = 0, v = g.length; m < v; m++) {
                                    var y = g[m];
                                    0 === y.name.indexOf("data-ace-") && (s[(o = y.name.replace(/^data-ace-/, ""), o.replace(/-(.)/g, function(e, t) {
                                        return t.toUpperCase()
                                    }))] = y.value)
                                }
                                var b = p.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                                b && (c = b[1])
                            }
                        }
                        for (var w in c && (s.base = s.base || c, s.packaged = !0), s.basePath = s.base, s.workerPath = s.workerPath || s.base, s.modePath = s.modePath || s.base, s.themePath = s.themePath || s.base, delete s.base, s) void 0 !== s[w] && t.set(w, s[w])
                    }
                }
                u(!0), t.init = u, t.version = "1.4.5"
            }), ace.define("ace/mouse/mouse_handler", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/event"),
                    i = e("../lib/useragent"),
                    o = e("./default_handlers").DefaultHandlers,
                    s = e("./default_gutter_handler").GutterHandler,
                    a = e("./mouse_event").MouseEvent,
                    l = e("./dragdrop_handler").DragdropHandler,
                    c = e("./touch_handler").addTouchListeners,
                    u = e("../config"),
                    h = function(e) {
                        var t = this;
                        this.editor = e, new o(this), new s(this), new l(this);
                        var n = function(t) {
                                (!document.hasFocus || !document.hasFocus() || !e.isFocused() && document.activeElement == (e.textInput && e.textInput.getElement())) && window.focus(), e.focus()
                            },
                            a = e.renderer.getMouseEventTarget();
                        r.addListener(a, "click", this.onMouseEvent.bind(this, "click")), r.addListener(a, "mousemove", this.onMouseMove.bind(this, "mousemove")), r.addMultiMouseDownListener([a, e.renderer.scrollBarV && e.renderer.scrollBarV.inner, e.renderer.scrollBarH && e.renderer.scrollBarH.inner, e.textInput && e.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent"), r.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel")), c(e.container, e);
                        var u = e.renderer.$gutter;
                        r.addListener(u, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), r.addListener(u, "click", this.onMouseEvent.bind(this, "gutterclick")), r.addListener(u, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), r.addListener(u, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), r.addListener(a, "mousedown", n), r.addListener(u, "mousedown", n), i.isIE && e.renderer.scrollBarV && (r.addListener(e.renderer.scrollBarV.element, "mousedown", n), r.addListener(e.renderer.scrollBarH.element, "mousedown", n)), e.on("mousemove", function(n) {
                            if (!t.state && !t.$dragDelay && t.$dragEnabled) {
                                var r = e.renderer.screenToTextCoordinates(n.x, n.y),
                                    i = e.session.selection.getRange(),
                                    o = e.renderer;
                                !i.isEmpty() && i.insideStart(r.row, r.column) ? o.setCursorStyle("default") : o.setCursorStyle("")
                            }
                        })
                    };
                (function() {
                    this.onMouseEvent = function(e, t) {
                        this.editor._emit(e, new a(t, this.editor))
                    }, this.onMouseMove = function(e, t) {
                        var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
                        n && n.length && this.editor._emit(e, new a(t, this.editor))
                    }, this.onMouseWheel = function(e, t) {
                        var n = new a(t, this.editor);
                        n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
                    }, this.setState = function(e) {
                        this.state = e
                    }, this.captureMouse = function(e, t) {
                        this.x = e.x, this.y = e.y, this.isMousePressed = !0;
                        var n = this.editor,
                            o = this.editor.renderer;
                        o.$isMousePressed = !0;
                        var s = this,
                            l = function(e) {
                                if (e) {
                                    if (i.isWebKit && !e.which && s.releaseMouse) return s.releaseMouse();
                                    s.x = e.clientX, s.y = e.clientY, t && t(e), s.mouseEvent = new a(e, s.editor), s.$mouseMoved = !0
                                }
                            },
                            c = function(e) {
                                n.off("beforeEndOperation", h), clearInterval(d), u(), s[s.state + "End"] && s[s.state + "End"](e), s.state = "", s.isMousePressed = o.$isMousePressed = !1, o.$keepTextAreaAtCursor && o.$moveTextAreaToCursor(), s.$onCaptureMouseMove = s.releaseMouse = null, e && s.onMouseEvent("mouseup", e), n.endOperation()
                            },
                            u = function() {
                                s[s.state] && s[s.state](), s.$mouseMoved = !1
                            };
                        if (i.isOldIE && "dblclick" == e.domEvent.type) return setTimeout(function() {
                            c(e)
                        });
                        var h = function(e) {
                            s.releaseMouse && n.curOp.command.name && n.curOp.selectionChanged && (s[s.state + "End"] && s[s.state + "End"](), s.state = "", s.releaseMouse())
                        };
                        n.on("beforeEndOperation", h), n.startOperation({
                            command: {
                                name: "mouse"
                            }
                        }), s.$onCaptureMouseMove = l, s.releaseMouse = r.capture(this.editor.container, l, c);
                        var d = setInterval(u, 20)
                    }, this.releaseMouse = null, this.cancelContextMenu = function() {
                        var e = function(t) {
                            t && t.domEvent && "contextmenu" != t.domEvent.type || (this.editor.off("nativecontextmenu", e), t && t.domEvent && r.stopEvent(t.domEvent))
                        }.bind(this);
                        setTimeout(e, 10), this.editor.on("nativecontextmenu", e)
                    }
                }).call(h.prototype), u.defineOptions(h.prototype, "mouseHandler", {
                    scrollSpeed: {
                        initialValue: 2
                    },
                    dragDelay: {
                        initialValue: i.isMac ? 150 : 0
                    },
                    dragEnabled: {
                        initialValue: !0
                    },
                    focusTimeout: {
                        initialValue: 0
                    },
                    tooltipFollowsMouse: {
                        initialValue: !0
                    }
                }), t.MouseHandler = h
            }), ace.define("ace/mouse/fold_handler", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom");
                t.FoldHandler = function(e) {
                    e.on("click", function(t) {
                        var n = t.getDocumentPosition(),
                            i = e.session,
                            o = i.getFoldAt(n.row, n.column, 1);
                        o && (t.getAccelKey() ? i.removeFold(o) : i.expandFold(o), t.stop());
                        var s = t.domEvent && t.domEvent.target;
                        s && r.hasCssClass(s, "ace_inline_button") && r.hasCssClass(s, "ace_toggle_wrap") && (i.setOption("wrap", !i.getUseWrapMode()), e.renderer.scrollCursorIntoView())
                    }), e.on("gutterclick", function(t) {
                        if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
                            var n = t.getDocumentPosition().row,
                                r = e.session;
                            r.foldWidgets && r.foldWidgets[n] && e.session.onFoldWidgetClick(n, t), e.isFocused() || e.focus(), t.stop()
                        }
                    }), e.on("gutterdblclick", function(t) {
                        if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
                            var n = t.getDocumentPosition().row,
                                r = e.session,
                                i = r.getParentFoldRangeData(n, !0),
                                o = i.range || i.firstRange;
                            if (o) {
                                n = o.start.row;
                                var s = r.getFoldAt(n, r.getLine(n).length, 1);
                                s ? r.removeFold(s) : (r.addFold("...", o), e.renderer.scrollCursorIntoView({
                                    row: o.start.row,
                                    column: 0
                                }))
                            }
                            t.stop()
                        }
                    })
                }
            }), ace.define("ace/keyboard/keybinding", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/keys"),
                    i = e("../lib/event"),
                    o = function(e) {
                        this.$editor = e, this.$data = {
                            editor: e
                        }, this.$handlers = [], this.setDefaultHandler(e.commands)
                    };
                (function() {
                    this.setDefaultHandler = function(e) {
                        this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0)
                    }, this.setKeyboardHandler = function(e) {
                        var t = this.$handlers;
                        if (t[t.length - 1] != e) {
                            for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler;) this.removeKeyboardHandler(t[t.length - 1]);
                            this.addKeyboardHandler(e, 1)
                        }
                    }, this.addKeyboardHandler = function(e, t) {
                        if (e) {
                            "function" != typeof e || e.handleKeyboard || (e.handleKeyboard = e);
                            var n = this.$handlers.indexOf(e); - 1 != n && this.$handlers.splice(n, 1), null == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == n && e.attach && e.attach(this.$editor)
                        }
                    }, this.removeKeyboardHandler = function(e) {
                        var t = this.$handlers.indexOf(e);
                        return -1 != t && (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
                    }, this.getKeyboardHandler = function() {
                        return this.$handlers[this.$handlers.length - 1]
                    }, this.getStatusText = function() {
                        var e = this.$data,
                            t = e.editor;
                        return this.$handlers.map(function(n) {
                            return n.getStatusText && n.getStatusText(t, e) || ""
                        }).filter(Boolean).join(" ")
                    }, this.$callKeyboardHandlers = function(e, t, n, r) {
                        for (var o, s = !1, a = this.$editor.commands, l = this.$handlers.length; l-- && !((o = this.$handlers[l].handleKeyboard(this.$data, e, t, n, r)) && o.command && ((s = "null" == o.command || a.exec(o.command, this.$editor, o.args, r)) && r && -1 != e && 1 != o.passEvent && 1 != o.command.passEvent && i.stopEvent(r), s)););
                        return s || -1 != e || (o = {
                            command: "insertstring"
                        }, s = a.exec("insertstring", this.$editor, t)), s && this.$editor._signal && this.$editor._signal("keyboardActivity", o), s
                    }, this.onCommandKey = function(e, t, n) {
                        var i = r.keyCodeToString(n);
                        this.$callKeyboardHandlers(t, i, n, e)
                    }, this.onTextInput = function(e) {
                        this.$callKeyboardHandlers(-1, e)
                    }
                }).call(o.prototype), t.KeyBinding = o
            }), ace.define("ace/lib/bidiutil", [], function(e, t, n) {
                "use strict";
                var r = 0,
                    i = 0,
                    o = !1,
                    s = !1,
                    a = !1,
                    l = [
                        [0, 3, 0, 1, 0, 0, 0],
                        [0, 3, 0, 1, 2, 2, 0],
                        [0, 3, 0, 17, 2, 0, 1],
                        [0, 3, 5, 5, 4, 1, 0],
                        [0, 3, 21, 21, 4, 0, 1],
                        [0, 3, 5, 5, 4, 2, 0]
                    ],
                    c = [
                        [2, 0, 1, 1, 0, 1, 0],
                        [2, 0, 1, 1, 0, 2, 0],
                        [2, 0, 2, 1, 3, 2, 0],
                        [2, 0, 2, 33, 3, 1, 1]
                    ],
                    u = 1,
                    h = 0,
                    d = 1,
                    f = 2,
                    p = 3,
                    g = 4,
                    m = 5,
                    v = 6,
                    y = 7,
                    b = 8,
                    w = 9,
                    _ = 10,
                    C = 11,
                    S = 12,
                    k = 13,
                    A = 14,
                    x = 15,
                    $ = 16,
                    T = 17,
                    E = 18,
                    R = [E, E, E, E, E, E, E, E, E, v, m, v, b, m, E, E, E, E, E, E, E, E, E, E, E, E, E, E, m, m, m, v, b, g, g, C, C, C, g, g, g, g, g, _, w, _, w, w, f, f, f, f, f, f, f, f, f, f, w, g, g, g, g, g, g, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, g, g, g, g, g, g, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, g, g, g, g, E, E, E, E, E, E, m, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, w, g, C, C, C, C, g, g, g, g, h, g, g, E, g, g, C, C, f, f, g, h, g, g, g, f, h, g, g, g, g, g],
                    M = [b, b, b, b, b, b, b, b, b, b, b, E, E, E, h, d, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, b, m, k, A, x, $, T, w, C, C, C, C, C, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, b];

                function L(e, t, n) {
                    if (!(i < e))
                        if (1 != e || r != u || s)
                            for (var o, a, l, c, h = n.length, d = 0; d < h;) {
                                if (t[d] >= e) {
                                    for (o = d + 1; o < h && t[o] >= e;) o++;
                                    for (a = d, l = o - 1; a < l; a++, l--) c = n[a], n[a] = n[l], n[l] = c;
                                    d = o
                                }
                                d++
                            } else n.reverse()
                }

                function P(e, t, n, i) {
                    var l, c, u, R, M = t[i];
                    switch (M) {
                        case h:
                        case d:
                            o = !1;
                        case g:
                        case p:
                            return M;
                        case f:
                            return o ? p : f;
                        case y:
                            return o = !0, !0, d;
                        case b:
                            return g;
                        case w:
                            return i < 1 || i + 1 >= t.length || (l = n[i - 1]) != f && l != p || (c = t[i + 1]) != f && c != p ? g : (o && (c = p), c == l ? c : g);
                        case _:
                            return (l = i > 0 ? n[i - 1] : m) == f && i + 1 < t.length && t[i + 1] == f ? f : g;
                        case C:
                            if (i > 0 && n[i - 1] == f) return f;
                            if (o) return g;
                            for (R = i + 1, u = t.length; R < u && t[R] == C;) R++;
                            return R < u && t[R] == f ? f : g;
                        case S:
                            for (u = t.length, R = i + 1; R < u && t[R] == S;) R++;
                            if (R < u) {
                                var L = e[i],
                                    P = L >= 1425 && L <= 2303 || 64286 == L;
                                if (l = t[R], P && (l == d || l == y)) return d
                            }
                            return i < 1 || (l = t[i - 1]) == m ? g : n[i - 1];
                        case m:
                            return o = !1, s = !0, r;
                        case v:
                            return a = !0, g;
                        case k:
                        case A:
                        case $:
                        case T:
                        case x:
                            o = !1;
                        case E:
                            return g
                    }
                }

                function O(e) {
                    var t = e.charCodeAt(0),
                        n = t >> 8;
                    return 0 == n ? t > 191 ? h : R[t] : 5 == n ? /[\u0591-\u05f4]/.test(e) ? d : h : 6 == n ? /[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e) ? S : /[\u0660-\u0669\u066b-\u066c]/.test(e) ? p : 1642 == t ? C : /[\u06f0-\u06f9]/.test(e) ? f : y : 32 == n && t <= 8287 ? M[255 & t] : 254 == n && t >= 65136 ? y : g
                }
                t.L = h, t.R = d, t.EN = f, t.ON_R = 3, t.AN = 4, t.R_H = 5, t.B = 6, t.RLE = 7, t.DOT = "Â·", t.doBidiReorder = function(e, n, h) {
                    if (e.length < 2) return {};
                    var f = e.split(""),
                        w = new Array(f.length),
                        _ = new Array(f.length),
                        C = [];
                    r = h ? u : 0,
                        function(e, t, n, u) {
                            var h = r ? c : l,
                                d = null,
                                f = null,
                                p = null,
                                g = 0,
                                y = null,
                                w = -1,
                                _ = null,
                                C = null,
                                S = [];
                            if (!u)
                                for (_ = 0, u = []; _ < n; _++) u[_] = O(e[_]);
                            for (i = r, o = !1, !1, s = !1, a = !1, C = 0; C < n; C++) {
                                if (d = g, S[C] = f = P(e, u, S, C), y = 240 & (g = h[d][f]), g &= 15, t[C] = p = h[g][5], y > 0)
                                    if (16 == y) {
                                        for (_ = w; _ < C; _++) t[_] = 1;
                                        w = -1
                                    } else w = -1;
                                if (h[g][6]) - 1 == w && (w = C);
                                else if (w > -1) {
                                    for (_ = w; _ < C; _++) t[_] = p;
                                    w = -1
                                }
                                u[C] == m && (t[C] = 0), i |= p
                            }
                            if (a)
                                for (_ = 0; _ < n; _++)
                                    if (u[_] == v) {
                                        t[_] = r;
                                        for (var k = _ - 1; k >= 0 && u[k] == b; k--) t[k] = r
                                    }
                        }(f, C, f.length, n);
                    for (var S = 0; S < w.length; w[S] = S, S++);
                    L(2, C, w), L(1, C, w);
                    for (S = 0; S < w.length - 1; S++) n[S] === p ? C[S] = t.AN : C[S] === d && (n[S] > y && n[S] < k || n[S] === g || n[S] === E) ? C[S] = t.ON_R : S > 0 && "Ù„" === f[S - 1] && /\u0622|\u0623|\u0625|\u0627/.test(f[S]) && (C[S - 1] = C[S] = t.R_H, S++);
                    f[f.length - 1] === t.DOT && (C[f.length - 1] = t.B), "â€«" === f[0] && (C[0] = t.RLE);
                    for (S = 0; S < w.length; S++) _[S] = C[w[S]];
                    return {
                        logicalFromVisual: w,
                        bidiLevels: _
                    }
                }, t.hasBidiCharacters = function(e, t) {
                    for (var n = !1, r = 0; r < e.length; r++) t[r] = O(e.charAt(r)), n || t[r] != d && t[r] != y && t[r] != p || (n = !0);
                    return n
                }, t.getVisualFromLogicalIdx = function(e, t) {
                    for (var n = 0; n < t.logicalFromVisual.length; n++)
                        if (t.logicalFromVisual[n] == e) return n;
                    return 0
                }
            }), ace.define("ace/bidihandler", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/bidiutil"),
                    i = e("./lib/lang"),
                    o = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/,
                    s = function(e) {
                        this.session = e, this.bidiMap = {}, this.currentRow = null, this.bidiUtil = r, this.charWidths = [], this.EOL = "Â¬", this.showInvisibles = !0, this.isRtlDir = !1, this.$isRtl = !1, this.line = "", this.wrapIndent = 0, this.EOF = "Â¶", this.RLE = "â€«", this.contentWidth = 0, this.fontMetrics = null, this.rtlLineOffset = 0, this.wrapOffset = 0, this.isMoveLeftOperation = !1, this.seenBidi = o.test(e.getValue())
                    };
                (function() {
                    this.isBidiRow = function(e, t, n) {
                        return !!this.seenBidi && (e !== this.currentRow && (this.currentRow = e, this.updateRowLine(t, n), this.updateBidiMap()), this.bidiMap.bidiLevels)
                    }, this.onChange = function(e) {
                        this.seenBidi ? this.currentRow = null : "insert" == e.action && o.test(e.lines.join("\n")) && (this.seenBidi = !0, this.currentRow = null)
                    }, this.getDocumentRow = function() {
                        var e = 0,
                            t = this.session.$screenRowCache;
                        if (t.length) {
                            var n = this.session.$getRowCacheIndex(t, this.currentRow);
                            n >= 0 && (e = this.session.$docRowCache[n])
                        }
                        return e
                    }, this.getSplitIndex = function() {
                        var e = 0,
                            t = this.session.$screenRowCache;
                        if (t.length)
                            for (var n, r = this.session.$getRowCacheIndex(t, this.currentRow); this.currentRow - e > 0 && (n = this.session.$getRowCacheIndex(t, this.currentRow - e - 1)) === r;) r = n, e++;
                        else e = this.currentRow;
                        return e
                    }, this.updateRowLine = function(e, t) {
                        void 0 === e && (e = this.getDocumentRow());
                        var n = e === this.session.getLength() - 1 ? this.EOF : this.EOL;
                        if (this.wrapIndent = 0, this.line = this.session.getLine(e), this.isRtlDir = this.$isRtl || this.line.charAt(0) === this.RLE, this.session.$useWrapMode) {
                            var o = this.session.$wrapData[e];
                            o && (void 0 === t && (t = this.getSplitIndex()), t > 0 && o.length ? (this.wrapIndent = o.indent, this.wrapOffset = this.wrapIndent * this.charWidths[r.L], this.line = t < o.length ? this.line.substring(o[t - 1], o[t]) : this.line.substring(o[o.length - 1])) : this.line = this.line.substring(0, o[t])), t == o.length && (this.line += this.showInvisibles ? n : r.DOT)
                        } else this.line += this.showInvisibles ? n : r.DOT;
                        var s, a = this.session,
                            l = 0;
                        this.line = this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g, function(e, t) {
                            return "\t" === e || a.isFullWidth(e.charCodeAt(0)) ? (s = "\t" === e ? a.getScreenTabSize(t + l) : 2, l += s - 1, i.stringRepeat(r.DOT, s)) : e
                        }), this.isRtlDir && (this.fontMetrics.$main.textContent = this.line.charAt(this.line.length - 1) == r.DOT ? this.line.substr(0, this.line.length - 1) : this.line, this.rtlLineOffset = this.contentWidth - this.fontMetrics.$main.getBoundingClientRect().width)
                    }, this.updateBidiMap = function() {
                        var e = [];
                        r.hasBidiCharacters(this.line, e) || this.isRtlDir ? this.bidiMap = r.doBidiReorder(this.line, e, this.isRtlDir) : this.bidiMap = {}
                    }, this.markAsDirty = function() {
                        this.currentRow = null
                    }, this.updateCharacterWidths = function(e) {
                        if (this.characterWidth !== e.$characterSize.width) {
                            this.fontMetrics = e;
                            var t = this.characterWidth = e.$characterSize.width,
                                n = e.$measureCharWidth("×”");
                            this.charWidths[r.L] = this.charWidths[r.EN] = this.charWidths[r.ON_R] = t, this.charWidths[r.R] = this.charWidths[r.AN] = n, this.charWidths[r.R_H] = .45 * n, this.charWidths[r.B] = this.charWidths[r.RLE] = 0, this.currentRow = null
                        }
                    }, this.setShowInvisibles = function(e) {
                        this.showInvisibles = e, this.currentRow = null
                    }, this.setEolChar = function(e) {
                        this.EOL = e
                    }, this.setContentWidth = function(e) {
                        this.contentWidth = e
                    }, this.isRtlLine = function(e) {
                        return !!this.$isRtl || (null != e ? this.session.getLine(e).charAt(0) == this.RLE : this.isRtlDir)
                    }, this.setRtlDirection = function(e, t) {
                        for (var n = e.getCursorPosition(), r = e.selection.getSelectionAnchor().row; r <= n.row; r++) t || e.session.getLine(r).charAt(0) !== e.session.$bidiHandler.RLE ? t && e.session.getLine(r).charAt(0) !== e.session.$bidiHandler.RLE && e.session.doc.insert({
                            column: 0,
                            row: r
                        }, e.session.$bidiHandler.RLE) : e.session.doc.removeInLine(r, 0, 1)
                    }, this.getPosLeft = function(e) {
                        e -= this.wrapIndent;
                        var t = this.line.charAt(0) === this.RLE ? 1 : 0,
                            n = e > t ? this.session.getOverwrite() ? e : e - 1 : t,
                            i = r.getVisualFromLogicalIdx(n, this.bidiMap),
                            o = this.bidiMap.bidiLevels,
                            s = 0;
                        !this.session.getOverwrite() && e <= t && o[i] % 2 != 0 && i++;
                        for (var a = 0; a < i; a++) s += this.charWidths[o[a]];
                        return !this.session.getOverwrite() && e > t && o[i] % 2 == 0 && (s += this.charWidths[o[i]]), this.wrapIndent && (s += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset), this.isRtlDir && (s += this.rtlLineOffset), s
                    }, this.getSelections = function(e, t) {
                        var n, r = this.bidiMap,
                            i = r.bidiLevels,
                            o = [],
                            s = 0,
                            a = Math.min(e, t) - this.wrapIndent,
                            l = Math.max(e, t) - this.wrapIndent,
                            c = !1,
                            u = !1,
                            h = 0;
                        this.wrapIndent && (s += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
                        for (var d, f = 0; f < i.length; f++) d = r.logicalFromVisual[f], n = i[f], (c = d >= a && d < l) && !u ? h = s : !c && u && o.push({
                            left: h,
                            width: s - h
                        }), s += this.charWidths[n], u = c;
                        if (c && f === i.length && o.push({
                            left: h,
                            width: s - h
                        }), this.isRtlDir)
                            for (var p = 0; p < o.length; p++) o[p].left += this.rtlLineOffset;
                        return o
                    }, this.offsetToCol = function(e) {
                        this.isRtlDir && (e -= this.rtlLineOffset);
                        var t = 0,
                            n = (e = Math.max(e, 0), 0),
                            r = 0,
                            i = this.bidiMap.bidiLevels,
                            o = this.charWidths[i[r]];
                        for (this.wrapIndent && (e -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset); e > n + o / 2;) {
                            if (n += o, r === i.length - 1) {
                                o = 0;
                                break
                            }
                            o = this.charWidths[i[++r]]
                        }
                        return r > 0 && i[r - 1] % 2 != 0 && i[r] % 2 == 0 ? (e < n && r--, t = this.bidiMap.logicalFromVisual[r]) : r > 0 && i[r - 1] % 2 == 0 && i[r] % 2 != 0 ? t = 1 + (e > n ? this.bidiMap.logicalFromVisual[r] : this.bidiMap.logicalFromVisual[r - 1]) : this.isRtlDir && r === i.length - 1 && 0 === o && i[r - 1] % 2 == 0 || !this.isRtlDir && 0 === r && i[r] % 2 != 0 ? t = 1 + this.bidiMap.logicalFromVisual[r] : (r > 0 && i[r - 1] % 2 != 0 && 0 !== o && r--, t = this.bidiMap.logicalFromVisual[r]), 0 === t && this.isRtlDir && t++, t + this.wrapIndent
                    }
                }).call(s.prototype), t.BidiHandler = s
            }), ace.define("ace/selection", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./lib/lang"),
                    o = e("./lib/event_emitter").EventEmitter,
                    s = e("./range").Range,
                    a = function(e) {
                        this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.cursor = this.lead = this.doc.createAnchor(0, 0), this.anchor = this.doc.createAnchor(0, 0), this.$silent = !1;
                        var t = this;
                        this.cursor.on("change", function(e) {
                            t.$cursorChanged = !0, t.$silent || t._emit("changeCursor"), t.$isEmpty || t.$silent || t._emit("changeSelection"), t.$keepDesiredColumnOnChange || e.old.column == e.value.column || (t.$desiredColumn = null)
                        }), this.anchor.on("change", function() {
                            t.$anchorChanged = !0, t.$isEmpty || t.$silent || t._emit("changeSelection")
                        })
                    };
                (function() {
                    r.implement(this, o), this.isEmpty = function() {
                        return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
                    }, this.isMultiLine = function() {
                        return !this.$isEmpty && this.anchor.row != this.cursor.row
                    }, this.getCursor = function() {
                        return this.lead.getPosition()
                    }, this.setSelectionAnchor = function(e, t) {
                        this.$isEmpty = !1, this.anchor.setPosition(e, t)
                    }, this.getAnchor = this.getSelectionAnchor = function() {
                        return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
                    }, this.getSelectionLead = function() {
                        return this.lead.getPosition()
                    }, this.isBackwards = function() {
                        var e = this.anchor,
                            t = this.lead;
                        return e.row > t.row || e.row == t.row && e.column > t.column
                    }, this.getRange = function() {
                        var e = this.anchor,
                            t = this.lead;
                        return this.$isEmpty ? s.fromPoints(t, t) : this.isBackwards() ? s.fromPoints(t, e) : s.fromPoints(e, t)
                    }, this.clearSelection = function() {
                        this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
                    }, this.selectAll = function() {
                        this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
                    }, this.setRange = this.setSelectionRange = function(e, t) {
                        var n = t ? e.end : e.start,
                            r = t ? e.start : e.end;
                        this.$setSelection(n.row, n.column, r.row, r.column)
                    }, this.$setSelection = function(e, t, n, r) {
                        var i = this.$isEmpty,
                            o = this.inMultiSelectMode;
                        this.$silent = !0, this.$cursorChanged = this.$anchorChanged = !1, this.anchor.setPosition(e, t), this.cursor.setPosition(n, r), this.$isEmpty = !s.comparePoints(this.anchor, this.cursor), this.$silent = !1, this.$cursorChanged && this._emit("changeCursor"), (this.$cursorChanged || this.$anchorChanged || i != this.$isEmpty || o) && this._emit("changeSelection")
                    }, this.$moveSelection = function(e) {
                        var t = this.lead;
                        this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
                    }, this.selectTo = function(e, t) {
                        this.$moveSelection(function() {
                            this.moveCursorTo(e, t)
                        })
                    }, this.selectToPosition = function(e) {
                        this.$moveSelection(function() {
                            this.moveCursorToPosition(e)
                        })
                    }, this.moveTo = function(e, t) {
                        this.clearSelection(), this.moveCursorTo(e, t)
                    }, this.moveToPosition = function(e) {
                        this.clearSelection(), this.moveCursorToPosition(e)
                    }, this.selectUp = function() {
                        this.$moveSelection(this.moveCursorUp)
                    }, this.selectDown = function() {
                        this.$moveSelection(this.moveCursorDown)
                    }, this.selectRight = function() {
                        this.$moveSelection(this.moveCursorRight)
                    }, this.selectLeft = function() {
                        this.$moveSelection(this.moveCursorLeft)
                    }, this.selectLineStart = function() {
                        this.$moveSelection(this.moveCursorLineStart)
                    }, this.selectLineEnd = function() {
                        this.$moveSelection(this.moveCursorLineEnd)
                    }, this.selectFileEnd = function() {
                        this.$moveSelection(this.moveCursorFileEnd)
                    }, this.selectFileStart = function() {
                        this.$moveSelection(this.moveCursorFileStart)
                    }, this.selectWordRight = function() {
                        this.$moveSelection(this.moveCursorWordRight)
                    }, this.selectWordLeft = function() {
                        this.$moveSelection(this.moveCursorWordLeft)
                    }, this.getWordRange = function(e, t) {
                        if (void 0 === t) {
                            var n = e || this.lead;
                            e = n.row, t = n.column
                        }
                        return this.session.getWordRange(e, t)
                    }, this.selectWord = function() {
                        this.setSelectionRange(this.getWordRange())
                    }, this.selectAWord = function() {
                        var e = this.getCursor(),
                            t = this.session.getAWordRange(e.row, e.column);
                        this.setSelectionRange(t)
                    }, this.getLineRange = function(e, t) {
                        var n, r = "number" == typeof e ? e : this.lead.row,
                            i = this.session.getFoldLine(r);
                        return i ? (r = i.start.row, n = i.end.row) : n = r, !0 === t ? new s(r, 0, n, this.session.getLine(n).length) : new s(r, 0, n + 1, 0)
                    }, this.selectLine = function() {
                        this.setSelectionRange(this.getLineRange())
                    }, this.moveCursorUp = function() {
                        this.moveCursorBy(-1, 0)
                    }, this.moveCursorDown = function() {
                        this.moveCursorBy(1, 0)
                    }, this.wouldMoveIntoSoftTab = function(e, t, n) {
                        var r = e.column,
                            i = e.column + t;
                        return n < 0 && (r = e.column - t, i = e.column), this.session.isTabStop(e) && this.doc.getLine(e.row).slice(r, i).split(" ").length - 1 == t
                    }, this.moveCursorLeft = function() {
                        var e, t = this.lead.getPosition();
                        if (e = this.session.getFoldAt(t.row, t.column, -1)) this.moveCursorTo(e.start.row, e.start.column);
                        else if (0 === t.column) t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);
                        else {
                            var n = this.session.getTabSize();
                            this.wouldMoveIntoSoftTab(t, n, -1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1)
                        }
                    }, this.moveCursorRight = function() {
                        var e, t = this.lead.getPosition();
                        if (e = this.session.getFoldAt(t.row, t.column, 1)) this.moveCursorTo(e.end.row, e.end.column);
                        else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
                        else {
                            var n = this.session.getTabSize();
                            t = this.lead;
                            this.wouldMoveIntoSoftTab(t, n, 1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1)
                        }
                    }, this.moveCursorLineStart = function() {
                        var e = this.lead.row,
                            t = this.lead.column,
                            n = this.session.documentToScreenRow(e, t),
                            r = this.session.screenToDocumentPosition(n, 0),
                            i = this.session.getDisplayLine(e, null, r.row, r.column).match(/^\s*/);
                        i[0].length == t || this.session.$useEmacsStyleLineStart || (r.column += i[0].length), this.moveCursorToPosition(r)
                    }, this.moveCursorLineEnd = function() {
                        var e = this.lead,
                            t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
                        if (this.lead.column == t.column) {
                            var n = this.session.getLine(t.row);
                            if (t.column == n.length) {
                                var r = n.search(/\s+$/);
                                r > 0 && (t.column = r)
                            }
                        }
                        this.moveCursorTo(t.row, t.column)
                    }, this.moveCursorFileEnd = function() {
                        var e = this.doc.getLength() - 1,
                            t = this.doc.getLine(e).length;
                        this.moveCursorTo(e, t)
                    }, this.moveCursorFileStart = function() {
                        this.moveCursorTo(0, 0)
                    }, this.moveCursorLongWordRight = function() {
                        var e = this.lead.row,
                            t = this.lead.column,
                            n = this.doc.getLine(e),
                            r = n.substring(t);
                        this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                        var i = this.session.getFoldAt(e, t, 1);
                        if (i) this.moveCursorTo(i.end.row, i.end.column);
                        else {
                            if (this.session.nonTokenRe.exec(r) && (t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = n.substring(t)), t >= n.length) return this.moveCursorTo(e, n.length), this.moveCursorRight(), void(e < this.doc.getLength() - 1 && this.moveCursorWordRight());
                            this.session.tokenRe.exec(r) && (t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e, t)
                        }
                    }, this.moveCursorLongWordLeft = function() {
                        var e, t = this.lead.row,
                            n = this.lead.column;
                        if (e = this.session.getFoldAt(t, n, -1)) this.moveCursorTo(e.start.row, e.start.column);
                        else {
                            var r = this.session.getFoldStringAt(t, n, -1);
                            null == r && (r = this.doc.getLine(t).substring(0, n));
                            var o = i.stringReverse(r);
                            if (this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, this.session.nonTokenRe.exec(o) && (n -= this.session.nonTokenRe.lastIndex, o = o.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), n <= 0) return this.moveCursorTo(t, 0), this.moveCursorLeft(), void(t > 0 && this.moveCursorWordLeft());
                            this.session.tokenRe.exec(o) && (n -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(t, n)
                        }
                    }, this.$shortWordEndIndex = function(e) {
                        var t, n = 0,
                            r = /\s/,
                            i = this.session.tokenRe;
                        if (i.lastIndex = 0, this.session.tokenRe.exec(e)) n = this.session.tokenRe.lastIndex;
                        else {
                            for (;
                                (t = e[n]) && r.test(t);) n++;
                            if (n < 1)
                                for (i.lastIndex = 0;
                                     (t = e[n]) && !i.test(t);)
                                    if (i.lastIndex = 0, n++, r.test(t)) {
                                        if (n > 2) {
                                            n--;
                                            break
                                        }
                                        for (;
                                            (t = e[n]) && r.test(t);) n++;
                                        if (n > 2) break
                                    }
                        }
                        return i.lastIndex = 0, n
                    }, this.moveCursorShortWordRight = function() {
                        var e = this.lead.row,
                            t = this.lead.column,
                            n = this.doc.getLine(e),
                            r = n.substring(t),
                            i = this.session.getFoldAt(e, t, 1);
                        if (i) return this.moveCursorTo(i.end.row, i.end.column);
                        if (t == n.length) {
                            var o = this.doc.getLength();
                            do {
                                e++, r = this.doc.getLine(e)
                            } while (e < o && /^\s*$/.test(r));
                            /^\s+/.test(r) || (r = ""), t = 0
                        }
                        var s = this.$shortWordEndIndex(r);
                        this.moveCursorTo(e, t + s)
                    }, this.moveCursorShortWordLeft = function() {
                        var e, t = this.lead.row,
                            n = this.lead.column;
                        if (e = this.session.getFoldAt(t, n, -1)) return this.moveCursorTo(e.start.row, e.start.column);
                        var r = this.session.getLine(t).substring(0, n);
                        if (0 === n) {
                            do {
                                t--, r = this.doc.getLine(t)
                            } while (t > 0 && /^\s*$/.test(r));
                            n = r.length, /\s+$/.test(r) || (r = "")
                        }
                        var o = i.stringReverse(r),
                            s = this.$shortWordEndIndex(o);
                        return this.moveCursorTo(t, n - s)
                    }, this.moveCursorWordRight = function() {
                        this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
                    }, this.moveCursorWordLeft = function() {
                        this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
                    }, this.moveCursorBy = function(e, t) {
                        var n, r = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
                        0 === t && (0 !== e && (this.session.$bidiHandler.isBidiRow(r.row, this.lead.row) ? (n = this.session.$bidiHandler.getPosLeft(r.column), r.column = Math.round(n / this.session.$bidiHandler.charWidths[0])) : n = r.column * this.session.$bidiHandler.charWidths[0]), this.$desiredColumn ? r.column = this.$desiredColumn : this.$desiredColumn = r.column);
                        var i = this.session.screenToDocumentPosition(r.row + e, r.column, n);
                        0 !== e && 0 === t && i.row === this.lead.row && i.column === this.lead.column && this.session.lineWidgets && this.session.lineWidgets[i.row] && (i.row > 0 || e > 0) && i.row++, this.moveCursorTo(i.row, i.column + t, 0 === t)
                    }, this.moveCursorToPosition = function(e) {
                        this.moveCursorTo(e.row, e.column)
                    }, this.moveCursorTo = function(e, t, n) {
                        var r = this.session.getFoldAt(e, t, 1);
                        r && (e = r.start.row, t = r.start.column), this.$keepDesiredColumnOnChange = !0;
                        var i = this.session.getLine(e);
                        /[\uDC00-\uDFFF]/.test(i.charAt(t)) && i.charAt(t - 1) && (this.lead.row == e && this.lead.column == t + 1 ? t -= 1 : t += 1), this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null)
                    }, this.moveCursorToScreen = function(e, t, n) {
                        var r = this.session.screenToDocumentPosition(e, t);
                        this.moveCursorTo(r.row, r.column, n)
                    }, this.detach = function() {
                        this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
                    }, this.fromOrientedRange = function(e) {
                        this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
                    }, this.toOrientedRange = function(e) {
                        var t = this.getRange();
                        return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
                    }, this.getRangeOfMovements = function(e) {
                        var t = this.getCursor();
                        try {
                            e(this);
                            var n = this.getCursor();
                            return s.fromPoints(t, n)
                        } catch (e) {
                            return s.fromPoints(t, t)
                        } finally {
                            this.moveCursorToPosition(t)
                        }
                    }, this.toJSON = function() {
                        if (this.rangeCount) var e = this.ranges.map(function(e) {
                            var t = e.clone();
                            return t.isBackwards = e.cursor == e.start, t
                        });
                        else(e = this.getRange()).isBackwards = this.isBackwards();
                        return e
                    }, this.fromJSON = function(e) {
                        if (null == e.start) {
                            if (this.rangeList && e.length > 1) {
                                this.toSingleRange(e[0]);
                                for (var t = e.length; t--;) {
                                    var n = s.fromPoints(e[t].start, e[t].end);
                                    e[t].isBackwards && (n.cursor = n.start), this.addRange(n, !0)
                                }
                                return
                            }
                            e = e[0]
                        }
                        this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards)
                    }, this.isEqual = function(e) {
                        if ((e.length || this.rangeCount) && e.length != this.rangeCount) return !1;
                        if (!e.length || !this.ranges) return this.getRange().isEqual(e);
                        for (var t = this.ranges.length; t--;)
                            if (!this.ranges[t].isEqual(e[t])) return !1;
                        return !0
                    }
                }).call(a.prototype), t.Selection = a
            }), ace.define("ace/tokenizer", [], function(e, t, n) {
                "use strict";
                var r = e("./config"),
                    i = 2e3,
                    o = function(e) {
                        for (var t in this.states = e, this.regExps = {}, this.matchMappings = {}, this.states) {
                            for (var n = this.states[t], r = [], i = 0, o = this.matchMappings[t] = {
                                defaultToken: "text"
                            }, s = "g", a = [], l = 0; l < n.length; l++) {
                                var c = n[l];
                                if (c.defaultToken && (o.defaultToken = c.defaultToken), c.caseInsensitive && (s = "gi"), null != c.regex) {
                                    c.regex instanceof RegExp && (c.regex = c.regex.toString().slice(1, -1));
                                    var u = c.regex,
                                        h = new RegExp("(?:(" + u + ")|(.))").exec("a").length - 2;
                                    Array.isArray(c.token) ? 1 == c.token.length || 1 == h ? c.token = c.token[0] : h - 1 != c.token.length ? (this.reportError("number of classes and regexp groups doesn't match", {
                                        rule: c,
                                        groupCount: h - 1
                                    }), c.token = c.token[0]) : (c.tokenArray = c.token, c.token = null, c.onMatch = this.$arrayTokens) : "function" != typeof c.token || c.onMatch || (c.onMatch = h > 1 ? this.$applyToken : c.token), h > 1 && (/\\\d/.test(c.regex) ? u = c.regex.replace(/\\([0-9]+)/g, function(e, t) {
                                        return "\\" + (parseInt(t, 10) + i + 1)
                                    }) : (h = 1, u = this.removeCapturingGroups(c.regex)), c.splitRegex || "string" == typeof c.token || a.push(c)), o[i] = l, i += h, r.push(u), c.onMatch || (c.onMatch = null)
                                }
                            }
                            r.length || (o[0] = 0, r.push("$")), a.forEach(function(e) {
                                e.splitRegex = this.createSplitterRegexp(e.regex, s)
                            }, this), this.regExps[t] = new RegExp("(" + r.join(")|(") + ")|($)", s)
                        }
                    };
                (function() {
                    this.$setMaxTokenCount = function(e) {
                        i = 0 | e
                    }, this.$applyToken = function(e) {
                        var t = this.splitRegex.exec(e).slice(1),
                            n = this.token.apply(this, t);
                        if ("string" == typeof n) return [{
                            type: n,
                            value: e
                        }];
                        for (var r = [], i = 0, o = n.length; i < o; i++) t[i] && (r[r.length] = {
                            type: n[i],
                            value: t[i]
                        });
                        return r
                    }, this.$arrayTokens = function(e) {
                        if (!e) return [];
                        var t = this.splitRegex.exec(e);
                        if (!t) return "text";
                        for (var n = [], r = this.tokenArray, i = 0, o = r.length; i < o; i++) t[i + 1] && (n[n.length] = {
                            type: r[i],
                            value: t[i + 1]
                        });
                        return n
                    }, this.removeCapturingGroups = function(e) {
                        return e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!]|(\()/g, function(e, t) {
                            return t ? "(?:" : e
                        })
                    }, this.createSplitterRegexp = function(e, t) {
                        if (-1 != e.indexOf("(?=")) {
                            var n = 0,
                                r = !1,
                                i = {};
                            e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e, t, o, s, a, l) {
                                return r ? r = "]" != a : a ? r = !0 : s ? (n == i.stack && (i.end = l + 1, i.stack = -1), n--) : o && (n++, 1 != o.length && (i.stack = n, i.start = l)), e
                            }), null != i.end && /^\)*$/.test(e.substr(i.end)) && (e = e.substring(0, i.start) + e.substr(i.end))
                        }
                        return "^" != e.charAt(0) && (e = "^" + e), "$" != e.charAt(e.length - 1) && (e += "$"), new RegExp(e, (t || "").replace("g", ""))
                    }, this.getLineTokens = function(e, t) {
                        if (t && "string" != typeof t) {
                            var n = t.slice(0);
                            "#tmp" === (t = n[0]) && (n.shift(), t = n.shift())
                        } else n = [];
                        var r = t || "start",
                            o = this.states[r];
                        o || (r = "start", o = this.states[r]);
                        var s = this.matchMappings[r],
                            a = this.regExps[r];
                        a.lastIndex = 0;
                        for (var l, c = [], u = 0, h = 0, d = {
                            type: null,
                            value: ""
                        }; l = a.exec(e);) {
                            var f = s.defaultToken,
                                p = null,
                                g = l[0],
                                m = a.lastIndex;
                            if (m - g.length > u) {
                                var v = e.substring(u, m - g.length);
                                d.type == f ? d.value += v : (d.type && c.push(d), d = {
                                    type: f,
                                    value: v
                                })
                            }
                            for (var y = 0; y < l.length - 2; y++)
                                if (void 0 !== l[y + 1]) {
                                    f = (p = o[s[y]]).onMatch ? p.onMatch(g, r, n, e) : p.token, p.next && (r = "string" == typeof p.next ? p.next : p.next(r, n), (o = this.states[r]) || (this.reportError("state doesn't exist", r), r = "start", o = this.states[r]), s = this.matchMappings[r], u = m, (a = this.regExps[r]).lastIndex = m), p.consumeLineEnd && (u = m);
                                    break
                                }
                            if (g)
                                if ("string" == typeof f) p && !1 === p.merge || d.type !== f ? (d.type && c.push(d), d = {
                                    type: f,
                                    value: g
                                }) : d.value += g;
                                else if (f) {
                                    d.type && c.push(d), d = {
                                        type: null,
                                        value: ""
                                    };
                                    for (y = 0; y < f.length; y++) c.push(f[y])
                                }
                            if (u == e.length) break;
                            if (u = m, h++ > i) {
                                for (h > 2 * e.length && this.reportError("infinite loop with in ace tokenizer", {
                                    startState: t,
                                    line: e
                                }); u < e.length;) d.type && c.push(d), d = {
                                    value: e.substring(u, u += 500),
                                    type: "overflow"
                                };
                                r = "start", n = [];
                                break
                            }
                        }
                        return d.type && c.push(d), n.length > 1 && n[0] !== r && n.unshift("#tmp", r), {
                            tokens: c,
                            state: n.length ? n : r
                        }
                    }, this.reportError = r.reportError
                }).call(o.prototype), t.Tokenizer = o
            }), ace.define("ace/mode/text_highlight_rules", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/lang"),
                    i = function() {
                        this.$rules = {
                            start: [{
                                token: "empty_line",
                                regex: "^$"
                            }, {
                                defaultToken: "text"
                            }]
                        }
                    };
                (function() {
                    this.addRules = function(e, t) {
                        if (t)
                            for (var n in e) {
                                for (var r = e[n], i = 0; i < r.length; i++) {
                                    var o = r[i];
                                    (o.next || o.onMatch) && ("string" == typeof o.next && 0 !== o.next.indexOf(t) && (o.next = t + o.next), o.nextState && 0 !== o.nextState.indexOf(t) && (o.nextState = t + o.nextState))
                                }
                                this.$rules[t + n] = r
                            } else
                            for (var n in e) this.$rules[n] = e[n]
                    }, this.getRules = function() {
                        return this.$rules
                    }, this.embedRules = function(e, t, n, i, o) {
                        var s = "function" == typeof e ? (new e).getRules() : e;
                        if (i)
                            for (var a = 0; a < i.length; a++) i[a] = t + i[a];
                        else
                            for (var l in i = [], s) i.push(t + l);
                        if (this.addRules(s, t), n) {
                            var c = Array.prototype[o ? "push" : "unshift"];
                            for (a = 0; a < i.length; a++) c.apply(this.$rules[i[a]], r.deepCopy(n))
                        }
                        this.$embeds || (this.$embeds = []), this.$embeds.push(t)
                    }, this.getEmbeds = function() {
                        return this.$embeds
                    };
                    var e = function(e, t) {
                            return ("start" != e || t.length) && t.unshift(this.nextState, e), this.nextState
                        },
                        t = function(e, t) {
                            return t.shift(), t.shift() || "start"
                        };
                    this.normalizeRules = function() {
                        var n = 0,
                            r = this.$rules;
                        Object.keys(r).forEach(function i(o) {
                            var s = r[o];
                            s.processed = !0;
                            for (var a = 0; a < s.length; a++) {
                                var l = s[a],
                                    c = null;
                                Array.isArray(l) && (c = l, l = {}), !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({
                                    defaultToken: l.token
                                }, {
                                    token: l.token + ".end",
                                    regex: l.end || l.start,
                                    next: "pop"
                                }), l.token = l.token + ".start", l.push = !0);
                                var u = l.next || l.push;
                                if (u && Array.isArray(u)) {
                                    var h = l.stateName;
                                    h || ("string" != typeof(h = l.token) && (h = h[0] || ""), r[h] && (h += n++)), r[h] = u, l.next = h, i(h)
                                } else "pop" == u && (l.next = t);
                                if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules)
                                    for (var d in l.rules) r[d] ? r[d].push && r[d].push.apply(r[d], l.rules[d]) : r[d] = l.rules[d];
                                var f = "string" == typeof l ? l : l.include;
                                if (f && (c = Array.isArray(f) ? f.map(function(e) {
                                    return r[e]
                                }) : r[f]), c) {
                                    var p = [a, 1].concat(c);
                                    l.noEscape && (p = p.filter(function(e) {
                                        return !e.next
                                    })), s.splice.apply(s, p), a--
                                }
                                l.keywordMap && (l.token = this.createKeywordMapper(l.keywordMap, l.defaultToken || "text", l.caseInsensitive), delete l.defaultToken)
                            }
                        }, this)
                    }, this.createKeywordMapper = function(e, t, n, r) {
                        var i = Object.create(null);
                        return Object.keys(e).forEach(function(t) {
                            var o = e[t];
                            n && (o = o.toLowerCase());
                            for (var s = o.split(r || "|"), a = s.length; a--;) i[s[a]] = t
                        }), Object.getPrototypeOf(i) && (i.__proto__ = null), this.$keywordList = Object.keys(i), e = null, n ? function(e) {
                            return i[e.toLowerCase()] || t
                        } : function(e) {
                            return i[e] || t
                        }
                    }, this.getKeywords = function() {
                        return this.$keywords
                    }
                }).call(i.prototype), t.TextHighlightRules = i
            }), ace.define("ace/mode/behaviour", [], function(e, t, n) {
                "use strict";
                var r = function() {
                    this.$behaviours = {}
                };
                (function() {
                    this.add = function(e, t, n) {
                        switch (void 0) {
                            case this.$behaviours:
                                this.$behaviours = {};
                            case this.$behaviours[e]:
                                this.$behaviours[e] = {}
                        }
                        this.$behaviours[e][t] = n
                    }, this.addBehaviours = function(e) {
                        for (var t in e)
                            for (var n in e[t]) this.add(t, n, e[t][n])
                    }, this.remove = function(e) {
                        this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
                    }, this.inherit = function(e, t) {
                        if ("function" == typeof e) var n = (new e).getBehaviours(t);
                        else n = e.getBehaviours(t);
                        this.addBehaviours(n)
                    }, this.getBehaviours = function(e) {
                        if (e) {
                            for (var t = {}, n = 0; n < e.length; n++) this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]);
                            return t
                        }
                        return this.$behaviours
                    }
                }).call(r.prototype), t.Behaviour = r
            }), ace.define("ace/token_iterator", [], function(e, t, n) {
                "use strict";
                var r = e("./range").Range,
                    i = function(e, t, n) {
                        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
                        var r = e.getTokenAt(t, n);
                        this.$tokenIndex = r ? r.index : -1
                    };
                (function() {
                    this.stepBackward = function() {
                        for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
                            if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
                            this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
                        }
                        return this.$rowTokens[this.$tokenIndex]
                    }, this.stepForward = function() {
                        var e;
                        for (this.$tokenIndex += 1; this.$tokenIndex >= this.$rowTokens.length;) {
                            if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e) return this.$row = e - 1, null;
                            this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
                        }
                        return this.$rowTokens[this.$tokenIndex]
                    }, this.getCurrentToken = function() {
                        return this.$rowTokens[this.$tokenIndex]
                    }, this.getCurrentTokenRow = function() {
                        return this.$row
                    }, this.getCurrentTokenColumn = function() {
                        var e = this.$rowTokens,
                            t = this.$tokenIndex,
                            n = e[t].start;
                        if (void 0 !== n) return n;
                        for (n = 0; t > 0;) n += e[t -= 1].value.length;
                        return n
                    }, this.getCurrentTokenPosition = function() {
                        return {
                            row: this.$row,
                            column: this.getCurrentTokenColumn()
                        }
                    }, this.getCurrentTokenRange = function() {
                        var e = this.$rowTokens[this.$tokenIndex],
                            t = this.getCurrentTokenColumn();
                        return new r(this.$row, t, this.$row, t + e.value.length)
                    }
                }).call(i.prototype), t.TokenIterator = i
            }), ace.define("ace/mode/behaviour/cstyle", [], function(e, t, n) {
                "use strict";
                var r, i = e("../../lib/oop"),
                    o = e("../behaviour").Behaviour,
                    s = e("../../token_iterator").TokenIterator,
                    a = e("../../lib/lang"),
                    l = ["text", "paren.rparen", "punctuation.operator"],
                    c = ["text", "paren.rparen", "punctuation.operator", "comment"],
                    u = {},
                    h = {
                        '"': '"',
                        "'": "'"
                    },
                    d = function(e) {
                        var t = -1;
                        if (e.multiSelect && (t = e.selection.index, u.rangeCount != e.multiSelect.rangeCount && (u = {
                            rangeCount: e.multiSelect.rangeCount
                        })), u[t]) return r = u[t];
                        r = u[t] = {
                            autoInsertedBrackets: 0,
                            autoInsertedRow: -1,
                            autoInsertedLineEnd: "",
                            maybeInsertedBrackets: 0,
                            maybeInsertedRow: -1,
                            maybeInsertedLineStart: "",
                            maybeInsertedLineEnd: ""
                        }
                    },
                    f = function(e, t, n, r) {
                        var i = e.end.row - e.start.row;
                        return {
                            text: n + t + r,
                            selection: [0, e.start.column + 1, i, e.end.column + (i ? 0 : 1)]
                        }
                    },
                    p = function e(t) {
                        this.add("braces", "insertion", function(n, i, o, s, l) {
                            var c = o.getCursorPosition(),
                                u = s.doc.getLine(c.row);
                            if ("{" == l) {
                                d(o);
                                var h = o.getSelectionRange(),
                                    p = s.doc.getTextRange(h);
                                if ("" !== p && "{" !== p && o.getWrapBehavioursEnabled()) return f(h, p, "{", "}");
                                if (e.isSaneInsertion(o, s)) return /[\]\}\)]/.test(u[c.column]) || o.inMultiSelectMode || t && t.braces ? (e.recordAutoInsert(o, s, "}"), {
                                    text: "{}",
                                    selection: [1, 1]
                                }) : (e.recordMaybeInsert(o, s, "{"), {
                                    text: "{",
                                    selection: [1, 1]
                                })
                            } else if ("}" == l) {
                                if (d(o), "}" == u.substring(c.column, c.column + 1))
                                    if (null !== s.$findOpeningBracket("}", {
                                        column: c.column + 1,
                                        row: c.row
                                    }) && e.isAutoInsertedClosing(c, u, l)) return e.popAutoInsertedClosing(), {
                                        text: "",
                                        selection: [1, 1]
                                    }
                            } else {
                                if ("\n" == l || "\r\n" == l) {
                                    d(o);
                                    var g = "";
                                    if (e.isMaybeInsertedClosing(c, u) && (g = a.stringRepeat("}", r.maybeInsertedBrackets), e.clearMaybeInsertedClosing()), "}" === u.substring(c.column, c.column + 1)) {
                                        var m = s.findMatchingBracket({
                                            row: c.row,
                                            column: c.column + 1
                                        }, "}");
                                        if (!m) return null;
                                        var v = this.$getIndent(s.getLine(m.row))
                                    } else {
                                        if (!g) return void e.clearMaybeInsertedClosing();
                                        v = this.$getIndent(u)
                                    }
                                    var y = v + s.getTabString();
                                    return {
                                        text: "\n" + y + "\n" + v + g,
                                        selection: [1, y.length, 1, y.length]
                                    }
                                }
                                e.clearMaybeInsertedClosing()
                            }
                        }), this.add("braces", "deletion", function(e, t, n, i, o) {
                            var s = i.doc.getTextRange(o);
                            if (!o.isMultiLine() && "{" == s) {
                                if (d(n), "}" == i.doc.getLine(o.start.row).substring(o.end.column, o.end.column + 1)) return o.end.column++, o;
                                r.maybeInsertedBrackets--
                            }
                        }), this.add("parens", "insertion", function(t, n, r, i, o) {
                            if ("(" == o) {
                                d(r);
                                var s = r.getSelectionRange(),
                                    a = i.doc.getTextRange(s);
                                if ("" !== a && r.getWrapBehavioursEnabled()) return f(s, a, "(", ")");
                                if (e.isSaneInsertion(r, i)) return e.recordAutoInsert(r, i, ")"), {
                                    text: "()",
                                    selection: [1, 1]
                                }
                            } else if (")" == o) {
                                d(r);
                                var l = r.getCursorPosition(),
                                    c = i.doc.getLine(l.row);
                                if (")" == c.substring(l.column, l.column + 1))
                                    if (null !== i.$findOpeningBracket(")", {
                                        column: l.column + 1,
                                        row: l.row
                                    }) && e.isAutoInsertedClosing(l, c, o)) return e.popAutoInsertedClosing(), {
                                        text: "",
                                        selection: [1, 1]
                                    }
                            }
                        }), this.add("parens", "deletion", function(e, t, n, r, i) {
                            var o = r.doc.getTextRange(i);
                            if (!i.isMultiLine() && "(" == o && (d(n), ")" == r.doc.getLine(i.start.row).substring(i.start.column + 1, i.start.column + 2))) return i.end.column++, i
                        }), this.add("brackets", "insertion", function(t, n, r, i, o) {
                            if ("[" == o) {
                                d(r);
                                var s = r.getSelectionRange(),
                                    a = i.doc.getTextRange(s);
                                if ("" !== a && r.getWrapBehavioursEnabled()) return f(s, a, "[", "]");
                                if (e.isSaneInsertion(r, i)) return e.recordAutoInsert(r, i, "]"), {
                                    text: "[]",
                                    selection: [1, 1]
                                }
                            } else if ("]" == o) {
                                d(r);
                                var l = r.getCursorPosition(),
                                    c = i.doc.getLine(l.row);
                                if ("]" == c.substring(l.column, l.column + 1))
                                    if (null !== i.$findOpeningBracket("]", {
                                        column: l.column + 1,
                                        row: l.row
                                    }) && e.isAutoInsertedClosing(l, c, o)) return e.popAutoInsertedClosing(), {
                                        text: "",
                                        selection: [1, 1]
                                    }
                            }
                        }), this.add("brackets", "deletion", function(e, t, n, r, i) {
                            var o = r.doc.getTextRange(i);
                            if (!i.isMultiLine() && "[" == o && (d(n), "]" == r.doc.getLine(i.start.row).substring(i.start.column + 1, i.start.column + 2))) return i.end.column++, i
                        }), this.add("string_dquotes", "insertion", function(e, t, n, r, i) {
                            var o = r.$mode.$quotes || h;
                            if (1 == i.length && o[i]) {
                                if (this.lineCommentStart && -1 != this.lineCommentStart.indexOf(i)) return;
                                d(n);
                                var s = i,
                                    a = n.getSelectionRange(),
                                    l = r.doc.getTextRange(a);
                                if (!("" === l || 1 == l.length && o[l]) && n.getWrapBehavioursEnabled()) return f(a, l, s, s);
                                if (!l) {
                                    var c = n.getCursorPosition(),
                                        u = r.doc.getLine(c.row),
                                        p = u.substring(c.column - 1, c.column),
                                        g = u.substring(c.column, c.column + 1),
                                        m = r.getTokenAt(c.row, c.column),
                                        v = r.getTokenAt(c.row, c.column + 1);
                                    if ("\\" == p && m && /escape/.test(m.type)) return null;
                                    var y, b = m && /string|escape/.test(m.type),
                                        w = !v || /string|escape/.test(v.type);
                                    if (g == s)(y = b !== w) && /string\.end/.test(v.type) && (y = !1);
                                    else {
                                        if (b && !w) return null;
                                        if (b && w) return null;
                                        var _ = r.$mode.tokenRe;
                                        _.lastIndex = 0;
                                        var C = _.test(p);
                                        _.lastIndex = 0;
                                        var S = _.test(p);
                                        if (C || S) return null;
                                        if (g && !/[\s;,.})\]\\]/.test(g)) return null;
                                        var k = u[c.column - 2];
                                        if (p == s && (k == s || _.test(k))) return null;
                                        y = !0
                                    }
                                    return {
                                        text: y ? s + s : "",
                                        selection: [1, 1]
                                    }
                                }
                            }
                        }), this.add("string_dquotes", "deletion", function(e, t, n, r, i) {
                            var o = r.$mode.$quotes || h,
                                s = r.doc.getTextRange(i);
                            if (!i.isMultiLine() && o.hasOwnProperty(s) && (d(n), r.doc.getLine(i.start.row).substring(i.start.column + 1, i.start.column + 2) == s)) return i.end.column++, i
                        })
                    };
                p.isSaneInsertion = function(e, t) {
                    var n = e.getCursorPosition(),
                        r = new s(t, n.row, n.column);
                    if (!this.$matchTokenType(r.getCurrentToken() || "text", l)) {
                        var i = new s(t, n.row, n.column + 1);
                        if (!this.$matchTokenType(i.getCurrentToken() || "text", l)) return !1
                    }
                    return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", c)
                }, p.$matchTokenType = function(e, t) {
                    return t.indexOf(e.type || e) > -1
                }, p.recordAutoInsert = function(e, t, n) {
                    var i = e.getCursorPosition(),
                        o = t.doc.getLine(i.row);
                    this.isAutoInsertedClosing(i, o, r.autoInsertedLineEnd[0]) || (r.autoInsertedBrackets = 0), r.autoInsertedRow = i.row, r.autoInsertedLineEnd = n + o.substr(i.column), r.autoInsertedBrackets++
                }, p.recordMaybeInsert = function(e, t, n) {
                    var i = e.getCursorPosition(),
                        o = t.doc.getLine(i.row);
                    this.isMaybeInsertedClosing(i, o) || (r.maybeInsertedBrackets = 0), r.maybeInsertedRow = i.row, r.maybeInsertedLineStart = o.substr(0, i.column) + n, r.maybeInsertedLineEnd = o.substr(i.column), r.maybeInsertedBrackets++
                }, p.isAutoInsertedClosing = function(e, t, n) {
                    return r.autoInsertedBrackets > 0 && e.row === r.autoInsertedRow && n === r.autoInsertedLineEnd[0] && t.substr(e.column) === r.autoInsertedLineEnd
                }, p.isMaybeInsertedClosing = function(e, t) {
                    return r.maybeInsertedBrackets > 0 && e.row === r.maybeInsertedRow && t.substr(e.column) === r.maybeInsertedLineEnd && t.substr(0, e.column) == r.maybeInsertedLineStart
                }, p.popAutoInsertedClosing = function() {
                    r.autoInsertedLineEnd = r.autoInsertedLineEnd.substr(1), r.autoInsertedBrackets--
                }, p.clearMaybeInsertedClosing = function() {
                    r && (r.maybeInsertedBrackets = 0, r.maybeInsertedRow = -1)
                }, i.inherits(p, o), t.CstyleBehaviour = p
            }), ace.define("ace/unicode", [], function(e, t, n) {
                "use strict";
                for (var r = [48, 9, 8, 25, 5, 0, 2, 25, 48, 0, 11, 0, 5, 0, 6, 22, 2, 30, 2, 457, 5, 11, 15, 4, 8, 0, 2, 0, 18, 116, 2, 1, 3, 3, 9, 0, 2, 2, 2, 0, 2, 19, 2, 82, 2, 138, 2, 4, 3, 155, 12, 37, 3, 0, 8, 38, 10, 44, 2, 0, 2, 1, 2, 1, 2, 0, 9, 26, 6, 2, 30, 10, 7, 61, 2, 9, 5, 101, 2, 7, 3, 9, 2, 18, 3, 0, 17, 58, 3, 100, 15, 53, 5, 0, 6, 45, 211, 57, 3, 18, 2, 5, 3, 11, 3, 9, 2, 1, 7, 6, 2, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 0, 4, 3, 3, 8, 3, 1, 3, 3, 9, 0, 5, 1, 2, 4, 3, 11, 16, 2, 2, 5, 5, 1, 3, 21, 2, 6, 2, 1, 2, 1, 2, 1, 3, 0, 2, 4, 5, 1, 3, 2, 4, 0, 8, 3, 2, 0, 8, 15, 12, 2, 2, 8, 2, 2, 2, 21, 2, 6, 2, 1, 2, 4, 3, 9, 2, 2, 2, 2, 3, 0, 16, 3, 3, 9, 18, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 3, 8, 3, 1, 3, 2, 9, 1, 5, 1, 2, 4, 3, 9, 2, 0, 17, 1, 2, 5, 4, 2, 2, 3, 4, 1, 2, 0, 2, 1, 4, 1, 4, 2, 4, 11, 5, 4, 4, 2, 2, 3, 3, 0, 7, 0, 15, 9, 18, 2, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 4, 7, 2, 2, 2, 3, 8, 1, 2, 1, 7, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 3, 8, 2, 2, 2, 3, 8, 1, 8, 0, 2, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 15, 4, 7, 2, 2, 2, 3, 10, 0, 9, 3, 3, 9, 11, 5, 3, 1, 2, 17, 4, 23, 2, 8, 2, 0, 3, 6, 4, 0, 5, 5, 2, 0, 2, 7, 19, 1, 14, 57, 6, 14, 2, 9, 40, 1, 2, 0, 3, 1, 2, 0, 3, 0, 7, 3, 2, 6, 2, 2, 2, 0, 2, 0, 3, 1, 2, 12, 2, 2, 3, 4, 2, 0, 2, 5, 3, 9, 3, 1, 35, 0, 24, 1, 7, 9, 12, 0, 2, 0, 2, 0, 5, 9, 2, 35, 5, 19, 2, 5, 5, 7, 2, 35, 10, 0, 58, 73, 7, 77, 3, 37, 11, 42, 2, 0, 4, 328, 2, 3, 3, 6, 2, 0, 2, 3, 3, 40, 2, 3, 3, 32, 2, 3, 3, 6, 2, 0, 2, 3, 3, 14, 2, 56, 2, 3, 3, 66, 5, 0, 33, 15, 17, 84, 13, 619, 3, 16, 2, 25, 6, 74, 22, 12, 2, 6, 12, 20, 12, 19, 13, 12, 2, 2, 2, 1, 13, 51, 3, 29, 4, 0, 5, 1, 3, 9, 34, 2, 3, 9, 7, 87, 9, 42, 6, 69, 11, 28, 4, 11, 5, 11, 11, 39, 3, 4, 12, 43, 5, 25, 7, 10, 38, 27, 5, 62, 2, 28, 3, 10, 7, 9, 14, 0, 89, 75, 5, 9, 18, 8, 13, 42, 4, 11, 71, 55, 9, 9, 4, 48, 83, 2, 2, 30, 14, 230, 23, 280, 3, 5, 3, 37, 3, 5, 3, 7, 2, 0, 2, 0, 2, 0, 2, 30, 3, 52, 2, 6, 2, 0, 4, 2, 2, 6, 4, 3, 3, 5, 5, 12, 6, 2, 2, 6, 67, 1, 20, 0, 29, 0, 14, 0, 17, 4, 60, 12, 5, 0, 4, 11, 18, 0, 5, 0, 3, 9, 2, 0, 4, 4, 7, 0, 2, 0, 2, 0, 2, 3, 2, 10, 3, 3, 6, 4, 5, 0, 53, 1, 2684, 46, 2, 46, 2, 132, 7, 6, 15, 37, 11, 53, 10, 0, 17, 22, 10, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 31, 48, 0, 470, 1, 36, 5, 2, 4, 6, 1, 5, 85, 3, 1, 3, 2, 2, 89, 2, 3, 6, 40, 4, 93, 18, 23, 57, 15, 513, 6581, 75, 20939, 53, 1164, 68, 45, 3, 268, 4, 27, 21, 31, 3, 13, 13, 1, 2, 24, 9, 69, 11, 1, 38, 8, 3, 102, 3, 1, 111, 44, 25, 51, 13, 68, 12, 9, 7, 23, 4, 0, 5, 45, 3, 35, 13, 28, 4, 64, 15, 10, 39, 54, 10, 13, 3, 9, 7, 22, 4, 1, 5, 66, 25, 2, 227, 42, 2, 1, 3, 9, 7, 11171, 13, 22, 5, 48, 8453, 301, 3, 61, 3, 105, 39, 6, 13, 4, 6, 11, 2, 12, 2, 4, 2, 0, 2, 1, 2, 1, 2, 107, 34, 362, 19, 63, 3, 53, 41, 11, 5, 15, 17, 6, 13, 1, 25, 2, 33, 4, 2, 134, 20, 9, 8, 25, 5, 0, 2, 25, 12, 88, 4, 5, 3, 5, 3, 5, 3, 2], i = 0, o = [], s = 0; s < r.length; s += 2) o.push(i += r[s]), r[s + 1] && o.push(45, i += r[s + 1]);
                t.wordChars = String.fromCharCode.apply(null, o)
            }), ace.define("ace/mode/text", [], function(e, t, n) {
                "use strict";
                var i = e("../config"),
                    o = e("../tokenizer").Tokenizer,
                    s = e("./text_highlight_rules").TextHighlightRules,
                    a = e("./behaviour/cstyle").CstyleBehaviour,
                    l = e("../unicode"),
                    c = e("../lib/lang"),
                    u = e("../token_iterator").TokenIterator,
                    h = e("../range").Range,
                    d = function() {
                        this.HighlightRules = s
                    };
                (function() {
                    this.$defaultBehaviour = new a, this.tokenRe = new RegExp("^[" + l.wordChars + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + l.wordChars + "\\$_]|\\s])+", "g"), this.getTokenizer = function() {
                        return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig), this.$tokenizer = new o(this.$highlightRules.getRules())), this.$tokenizer
                    }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e, t, n, r) {
                        var i = t.doc,
                            o = !0,
                            s = !0,
                            a = 1 / 0,
                            l = t.getTabSize(),
                            u = !1;
                        if (this.lineCommentStart) {
                            if (Array.isArray(this.lineCommentStart)) g = this.lineCommentStart.map(c.escapeRegExp).join("|"), f = this.lineCommentStart[0];
                            else g = c.escapeRegExp(this.lineCommentStart), f = this.lineCommentStart;
                            g = new RegExp("^(\\s*)(?:" + g + ") ?"), u = t.getUseSoftTabs();
                            y = function(e, t) {
                                var n = e.match(g);
                                if (n) {
                                    var r = n[1].length,
                                        o = n[0].length;
                                    d(e, r, o) || " " != n[0][o - 1] || o--, i.removeInLine(t, r, o)
                                }
                            };
                            var h = f + " ",
                                d = (v = function(e, t) {
                                    o && !/\S/.test(e) || (d(e, a, a) ? i.insertInLine({
                                        row: t,
                                        column: a
                                    }, h) : i.insertInLine({
                                        row: t,
                                        column: a
                                    }, f))
                                }, b = function(e, t) {
                                    return g.test(e)
                                }, function(e, t, n) {
                                    for (var r = 0; t-- && " " == e.charAt(t);) r++;
                                    if (r % l != 0) return !1;
                                    for (r = 0;
                                         " " == e.charAt(n++);) r++;
                                    return l > 2 ? r % l != l - 1 : r % l == 0
                                })
                        } else {
                            if (!this.blockComment) return !1;
                            var f = this.blockComment.start,
                                p = this.blockComment.end,
                                g = new RegExp("^(\\s*)(?:" + c.escapeRegExp(f) + ")"),
                                m = new RegExp("(?:" + c.escapeRegExp(p) + ")\\s*$"),
                                v = function(e, t) {
                                    b(e, t) || o && !/\S/.test(e) || (i.insertInLine({
                                        row: t,
                                        column: e.length
                                    }, p), i.insertInLine({
                                        row: t,
                                        column: a
                                    }, f))
                                },
                                y = function(e, t) {
                                    var n;
                                    (n = e.match(m)) && i.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(g)) && i.removeInLine(t, n[1].length, n[0].length)
                                },
                                b = function(e, n) {
                                    if (g.test(e)) return !0;
                                    for (var r = t.getTokens(n), i = 0; i < r.length; i++)
                                        if ("comment" === r[i].type) return !0
                                }
                        }

                        function w(e) {
                            for (var t = n; t <= r; t++) e(i.getLine(t), t)
                        }
                        var _ = 1 / 0;
                        w(function(e, t) {
                            var n = e.search(/\S/); - 1 !== n ? (n < a && (a = n), s && !b(e, t) && (s = !1)) : _ > e.length && (_ = e.length)
                        }), a == 1 / 0 && (a = _, o = !1, s = !1), u && a % l != 0 && (a = Math.floor(a / l) * l), w(s ? y : v)
                    }, this.toggleBlockComment = function(e, t, n, r) {
                        var i = this.blockComment;
                        if (i) {
                            !i.start && i[0] && (i = i[0]);
                            var o, s, a = (g = new u(t, r.row, r.column)).getCurrentToken(),
                                l = (t.selection, t.selection.toOrientedRange());
                            if (a && /comment/.test(a.type)) {
                                for (var c, d; a && /comment/.test(a.type);) {
                                    if (-1 != (m = a.value.indexOf(i.start))) {
                                        var f = g.getCurrentTokenRow(),
                                            p = g.getCurrentTokenColumn() + m;
                                        c = new h(f, p, f, p + i.start.length);
                                        break
                                    }
                                    a = g.stepBackward()
                                }
                                var g;
                                for (a = (g = new u(t, r.row, r.column)).getCurrentToken(); a && /comment/.test(a.type);) {
                                    var m;
                                    if (-1 != (m = a.value.indexOf(i.end))) {
                                        f = g.getCurrentTokenRow(), p = g.getCurrentTokenColumn() + m;
                                        d = new h(f, p, f, p + i.end.length);
                                        break
                                    }
                                    a = g.stepForward()
                                }
                                d && t.remove(d), c && (t.remove(c), o = c.start.row, s = -i.start.length)
                            } else s = i.start.length, o = n.start.row, t.insert(n.end, i.end), t.insert(n.start, i.start);
                            l.start.row == o && (l.start.column += s), l.end.row == o && (l.end.column += s), t.selection.fromOrientedRange(l)
                        }
                    }, this.getNextLineIndent = function(e, t, n) {
                        return this.$getIndent(t)
                    }, this.checkOutdent = function(e, t, n) {
                        return !1
                    }, this.autoOutdent = function(e, t, n) {}, this.$getIndent = function(e) {
                        return e.match(/^\s*/)[0]
                    }, this.createWorker = function(e) {
                        return null
                    }, this.createModeDelegates = function(e) {
                        for (var t in this.$embeds = [], this.$modes = {}, e)
                            if (e[t]) {
                                var n = e[t],
                                    r = n.prototype.$id,
                                    o = i.$modes[r];
                                o || (i.$modes[r] = o = new n), i.$modes[t] || (i.$modes[t] = o), this.$embeds.push(t), this.$modes[t] = o
                            }
                        var s = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
                        for (t = 0; t < s.length; t++) ! function(e) {
                            var n = s[t],
                                r = e[n];
                            e[s[t]] = function() {
                                return this.$delegator(n, arguments, r)
                            }
                        }(this)
                    }, this.$delegator = function(e, t, n) {
                        var r = t[0] || "start";
                        if ("string" != typeof r) {
                            if (Array.isArray(r[2])) {
                                var i = r[2][r[2].length - 1];
                                if (s = this.$modes[i]) return s[e].apply(s, [r[1]].concat([].slice.call(t, 1)))
                            }
                            r = r[0] || "start"
                        }
                        for (var o = 0; o < this.$embeds.length; o++)
                            if (this.$modes[this.$embeds[o]]) {
                                var s, a = r.split(this.$embeds[o]);
                                if (!a[0] && a[1]) return t[0] = a[1], (s = this.$modes[this.$embeds[o]])[e].apply(s, t)
                            }
                        var l = n.apply(this, t);
                        return n ? l : void 0
                    }, this.transformAction = function(e, t, n, r, i) {
                        if (this.$behaviour) {
                            var o = this.$behaviour.getBehaviours();
                            for (var s in o)
                                if (o[s][t]) {
                                    var a = o[s][t].apply(this, arguments);
                                    if (a) return a
                                }
                        }
                    }, this.getKeywords = function(e) {
                        if (!this.completionKeywords) {
                            var t = this.$tokenizer.rules,
                                n = [];
                            for (var i in t)
                                for (var o = t[i], s = 0, a = o.length; s < a; s++)
                                    if ("string" == typeof o[s].token) /keyword|support|storage/.test(o[s].token) && n.push(o[s].regex);
                                    else if ("object" === r(o[s].token))
                                        for (var l = 0, c = o[s].token.length; l < c; l++)
                                            if (/keyword|support|storage/.test(o[s].token[l])) {
                                                i = o[s].regex.match(/\(.+?\)/g)[l];
                                                n.push(i.substr(1, i.length - 2))
                                            }
                            this.completionKeywords = n
                        }
                        return e ? n.concat(this.$keywordList || []) : this.$keywordList
                    }, this.$createKeywordList = function() {
                        return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || []
                    }, this.getCompletions = function(e, t, n, r) {
                        return (this.$keywordList || this.$createKeywordList()).map(function(e) {
                            return {
                                name: e,
                                value: e,
                                score: 0,
                                meta: "keyword"
                            }
                        })
                    }, this.$id = "ace/mode/text"
                }).call(d.prototype), t.Mode = d
            }), ace.define("ace/apply_delta", [], function(e, t, n) {
                "use strict";
                t.applyDelta = function(e, t, n) {
                    var r = t.start.row,
                        i = t.start.column,
                        o = e[r] || "";
                    switch (t.action) {
                        case "insert":
                            if (1 === t.lines.length) e[r] = o.substring(0, i) + t.lines[0] + o.substring(i);
                            else {
                                var s = [r, 1].concat(t.lines);
                                e.splice.apply(e, s), e[r] = o.substring(0, i) + e[r], e[r + t.lines.length - 1] += o.substring(i)
                            }
                            break;
                        case "remove":
                            var a = t.end.column,
                                l = t.end.row;
                            r === l ? e[r] = o.substring(0, i) + o.substring(a) : e.splice(r, l - r + 1, o.substring(0, i) + e[l].substring(a))
                    }
                }
            }), ace.define("ace/anchor", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./lib/event_emitter").EventEmitter,
                    o = t.Anchor = function(e, t, n) {
                        this.$onChange = this.onChange.bind(this), this.attach(e), void 0 === n ? this.setPosition(t.row, t.column) : this.setPosition(t, n)
                    };
                (function() {
                    function e(e, t, n) {
                        var r = n ? e.column <= t.column : e.column < t.column;
                        return e.row < t.row || e.row == t.row && r
                    }
                    r.implement(this, i), this.getPosition = function() {
                        return this.$clipPositionToDocument(this.row, this.column)
                    }, this.getDocument = function() {
                        return this.document
                    }, this.$insertRight = !1, this.onChange = function(t) {
                        if (!(t.start.row == t.end.row && t.start.row != this.row || t.start.row > this.row)) {
                            var n = function(t, n, r) {
                                var i = "insert" == t.action,
                                    o = (i ? 1 : -1) * (t.end.row - t.start.row),
                                    s = (i ? 1 : -1) * (t.end.column - t.start.column),
                                    a = t.start,
                                    l = i ? a : t.end;
                                if (e(n, a, r)) return {
                                    row: n.row,
                                    column: n.column
                                };
                                if (e(l, n, !r)) return {
                                    row: n.row + o,
                                    column: n.column + (n.row == l.row ? s : 0)
                                };
                                return {
                                    row: a.row,
                                    column: a.column
                                }
                            }(t, {
                                row: this.row,
                                column: this.column
                            }, this.$insertRight);
                            this.setPosition(n.row, n.column, !0)
                        }
                    }, this.setPosition = function(e, t, n) {
                        var r;
                        if (r = n ? {
                            row: e,
                            column: t
                        } : this.$clipPositionToDocument(e, t), this.row != r.row || this.column != r.column) {
                            var i = {
                                row: this.row,
                                column: this.column
                            };
                            this.row = r.row, this.column = r.column, this._signal("change", {
                                old: i,
                                value: r
                            })
                        }
                    }, this.detach = function() {
                        this.document.removeEventListener("change", this.$onChange)
                    }, this.attach = function(e) {
                        this.document = e || this.document, this.document.on("change", this.$onChange)
                    }, this.$clipPositionToDocument = function(e, t) {
                        var n = {};
                        return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n
                    }
                }).call(o.prototype)
            }), ace.define("ace/document", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./apply_delta").applyDelta,
                    o = e("./lib/event_emitter").EventEmitter,
                    s = e("./range").Range,
                    a = e("./anchor").Anchor,
                    l = function(e) {
                        this.$lines = [""], 0 === e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({
                            row: 0,
                            column: 0
                        }, e) : this.insert({
                            row: 0,
                            column: 0
                        }, e)
                    };
                (function() {
                    r.implement(this, o), this.setValue = function(e) {
                        var t = this.getLength() - 1;
                        this.remove(new s(0, 0, t, this.getLine(t).length)), this.insert({
                            row: 0,
                            column: 0
                        }, e)
                    }, this.getValue = function() {
                        return this.getAllLines().join(this.getNewLineCharacter())
                    }, this.createAnchor = function(e, t) {
                        return new a(this, e, t)
                    }, 0 === "aaa".split(/a/).length ? this.$split = function(e) {
                        return e.replace(/\r\n|\r/g, "\n").split("\n")
                    } : this.$split = function(e) {
                        return e.split(/\r\n|\r|\n/)
                    }, this.$detectNewLine = function(e) {
                        var t = e.match(/^.*?(\r\n|\r|\n)/m);
                        this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode")
                    }, this.getNewLineCharacter = function() {
                        switch (this.$newLineMode) {
                            case "windows":
                                return "\r\n";
                            case "unix":
                                return "\n";
                            default:
                                return this.$autoNewLine || "\n"
                        }
                    }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function(e) {
                        this.$newLineMode !== e && (this.$newLineMode = e, this._signal("changeNewLineMode"))
                    }, this.getNewLineMode = function() {
                        return this.$newLineMode
                    }, this.isNewLine = function(e) {
                        return "\r\n" == e || "\r" == e || "\n" == e
                    }, this.getLine = function(e) {
                        return this.$lines[e] || ""
                    }, this.getLines = function(e, t) {
                        return this.$lines.slice(e, t + 1)
                    }, this.getAllLines = function() {
                        return this.getLines(0, this.getLength())
                    }, this.getLength = function() {
                        return this.$lines.length
                    }, this.getTextRange = function(e) {
                        return this.getLinesForRange(e).join(this.getNewLineCharacter())
                    }, this.getLinesForRange = function(e) {
                        var t;
                        if (e.start.row === e.end.row) t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];
                        else {
                            (t = this.getLines(e.start.row, e.end.row))[0] = (t[0] || "").substring(e.start.column);
                            var n = t.length - 1;
                            e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column))
                        }
                        return t
                    }, this.insertLines = function(e, t) {
                        return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t)
                    }, this.removeLines = function(e, t) {
                        return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t)
                    }, this.insertNewLine = function(e) {
                        return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""])
                    }, this.insert = function(e, t) {
                        return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t))
                    }, this.insertInLine = function(e, t) {
                        var n = this.clippedPos(e.row, e.column),
                            r = this.pos(e.row, e.column + t.length);
                        return this.applyDelta({
                            start: n,
                            end: r,
                            action: "insert",
                            lines: [t]
                        }, !0), this.clonePos(r)
                    }, this.clippedPos = function(e, t) {
                        var n = this.getLength();
                        void 0 === e ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = void 0);
                        var r = this.getLine(e);
                        return null == t && (t = r.length), {
                            row: e,
                            column: t = Math.min(Math.max(t, 0), r.length)
                        }
                    }, this.clonePos = function(e) {
                        return {
                            row: e.row,
                            column: e.column
                        }
                    }, this.pos = function(e, t) {
                        return {
                            row: e,
                            column: t
                        }
                    }, this.$clipPosition = function(e) {
                        var t = this.getLength();
                        return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e
                    }, this.insertFullLines = function(e, t) {
                        var n = 0;
                        (e = Math.min(Math.max(e, 0), this.getLength())) < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({
                            row: e,
                            column: n
                        }, t)
                    }, this.insertMergedLines = function(e, t) {
                        var n = this.clippedPos(e.row, e.column),
                            r = {
                                row: n.row + t.length - 1,
                                column: (1 == t.length ? n.column : 0) + t[t.length - 1].length
                            };
                        return this.applyDelta({
                            start: n,
                            end: r,
                            action: "insert",
                            lines: t
                        }), this.clonePos(r)
                    }, this.remove = function(e) {
                        var t = this.clippedPos(e.start.row, e.start.column),
                            n = this.clippedPos(e.end.row, e.end.column);
                        return this.applyDelta({
                            start: t,
                            end: n,
                            action: "remove",
                            lines: this.getLinesForRange({
                                start: t,
                                end: n
                            })
                        }), this.clonePos(t)
                    }, this.removeInLine = function(e, t, n) {
                        var r = this.clippedPos(e, t),
                            i = this.clippedPos(e, n);
                        return this.applyDelta({
                            start: r,
                            end: i,
                            action: "remove",
                            lines: this.getLinesForRange({
                                start: r,
                                end: i
                            })
                        }, !0), this.clonePos(r)
                    }, this.removeFullLines = function(e, t) {
                        e = Math.min(Math.max(0, e), this.getLength() - 1);
                        var n = (t = Math.min(Math.max(0, t), this.getLength() - 1)) == this.getLength() - 1 && e > 0,
                            r = t < this.getLength() - 1,
                            i = n ? e - 1 : e,
                            o = n ? this.getLine(i).length : 0,
                            a = r ? t + 1 : t,
                            l = r ? 0 : this.getLine(a).length,
                            c = new s(i, o, a, l),
                            u = this.$lines.slice(e, t + 1);
                        return this.applyDelta({
                            start: c.start,
                            end: c.end,
                            action: "remove",
                            lines: this.getLinesForRange(c)
                        }), u
                    }, this.removeNewLine = function(e) {
                        e < this.getLength() - 1 && e >= 0 && this.applyDelta({
                            start: this.pos(e, this.getLine(e).length),
                            end: this.pos(e + 1, 0),
                            action: "remove",
                            lines: ["", ""]
                        })
                    }, this.replace = function(e, t) {
                        return e instanceof s || (e = s.fromPoints(e.start, e.end)), 0 === t.length && e.isEmpty() ? e.start : t == this.getTextRange(e) ? e.end : (this.remove(e), t ? this.insert(e.start, t) : e.start)
                    }, this.applyDeltas = function(e) {
                        for (var t = 0; t < e.length; t++) this.applyDelta(e[t])
                    }, this.revertDeltas = function(e) {
                        for (var t = e.length - 1; t >= 0; t--) this.revertDelta(e[t])
                    }, this.applyDelta = function(e, t) {
                        var n = "insert" == e.action;
                        (n ? e.lines.length <= 1 && !e.lines[0] : !s.comparePoints(e.start, e.end)) || (n && e.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e, 2e4) : (i(this.$lines, e, t), this._signal("change", e)))
                    }, this.$splitAndapplyLargeDelta = function(e, t) {
                        for (var n = e.lines, r = n.length - t + 1, i = e.start.row, o = e.start.column, s = 0, a = 0; s < r; s = a) {
                            a += t - 1;
                            var l = n.slice(s, a);
                            l.push(""), this.applyDelta({
                                start: this.pos(i + s, o),
                                end: this.pos(i + a, o = 0),
                                action: e.action,
                                lines: l
                            }, !0)
                        }
                        e.lines = n.slice(s), e.start.row = i + s, e.start.column = o, this.applyDelta(e, !0)
                    }, this.revertDelta = function(e) {
                        this.applyDelta({
                            start: this.clonePos(e.start),
                            end: this.clonePos(e.end),
                            action: "insert" == e.action ? "remove" : "insert",
                            lines: e.lines.slice()
                        })
                    }, this.indexToPosition = function(e, t) {
                        for (var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = t || 0, o = n.length; i < o; i++)
                            if ((e -= n[i].length + r) < 0) return {
                                row: i,
                                column: e + n[i].length + r
                            };
                        return {
                            row: o - 1,
                            column: e + n[o - 1].length + r
                        }
                    }, this.positionToIndex = function(e, t) {
                        for (var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = 0, o = Math.min(e.row, n.length), s = t || 0; s < o; ++s) i += n[s].length + r;
                        return i + e.column
                    }
                }).call(l.prototype), t.Document = l
            }), ace.define("ace/background_tokenizer", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./lib/event_emitter").EventEmitter,
                    o = function(e, t) {
                        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
                        var n = this;
                        this.$worker = function() {
                            if (n.running) {
                                for (var e = new Date, t = n.currentLine, r = -1, i = n.doc, o = t; n.lines[t];) t++;
                                var s = i.getLength(),
                                    a = 0;
                                for (n.running = !1; t < s;) {
                                    n.$tokenizeRow(t), r = t;
                                    do {
                                        t++
                                    } while (n.lines[t]);
                                    if (++a % 5 == 0 && new Date - e > 20) {
                                        n.running = setTimeout(n.$worker, 20);
                                        break
                                    }
                                }
                                n.currentLine = t, -1 == r && (r = t), o <= r && n.fireUpdateEvent(o, r)
                            }
                        }
                    };
                (function() {
                    r.implement(this, i), this.setTokenizer = function(e) {
                        this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
                    }, this.setDocument = function(e) {
                        this.doc = e, this.lines = [], this.states = [], this.stop()
                    }, this.fireUpdateEvent = function(e, t) {
                        var n = {
                            first: e,
                            last: t
                        };
                        this._signal("update", {
                            data: n
                        })
                    }, this.start = function(e) {
                        this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
                    }, this.scheduleStart = function() {
                        this.running || (this.running = setTimeout(this.$worker, 700))
                    }, this.$updateOnChange = function(e) {
                        var t = e.start.row,
                            n = e.end.row - t;
                        if (0 === n) this.lines[t] = null;
                        else if ("remove" == e.action) this.lines.splice(t, n + 1, null), this.states.splice(t, n + 1, null);
                        else {
                            var r = Array(n + 1);
                            r.unshift(t, 1), this.lines.splice.apply(this.lines, r), this.states.splice.apply(this.states, r)
                        }
                        this.currentLine = Math.min(t, this.currentLine, this.doc.getLength()), this.stop()
                    }, this.stop = function() {
                        this.running && clearTimeout(this.running), this.running = !1
                    }, this.getTokens = function(e) {
                        return this.lines[e] || this.$tokenizeRow(e)
                    }, this.getState = function(e) {
                        return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
                    }, this.$tokenizeRow = function(e) {
                        var t = this.doc.getLine(e),
                            n = this.states[e - 1],
                            r = this.tokenizer.getLineTokens(t, n, e);
                        return this.states[e] + "" != r.state + "" ? (this.states[e] = r.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = r.tokens
                    }
                }).call(o.prototype), t.BackgroundTokenizer = o
            }), ace.define("ace/search_highlight", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/lang"),
                    i = (e("./lib/oop"), e("./range").Range),
                    o = function(e, t, n) {
                        this.setRegexp(e), this.clazz = t, this.type = n || "text"
                    };
                (function() {
                    this.MAX_RANGES = 500, this.setRegexp = function(e) {
                        this.regExp + "" != e + "" && (this.regExp = e, this.cache = [])
                    }, this.update = function(e, t, n, o) {
                        if (this.regExp)
                            for (var s = o.firstRow, a = o.lastRow, l = s; l <= a; l++) {
                                var c = this.cache[l];
                                null == c && ((c = r.getMatchOffsets(n.getLine(l), this.regExp)).length > this.MAX_RANGES && (c = c.slice(0, this.MAX_RANGES)), c = c.map(function(e) {
                                    return new i(l, e.offset, l, e.offset + e.length)
                                }), this.cache[l] = c.length ? c : "");
                                for (var u = c.length; u--;) t.drawSingleLineMarker(e, c[u].toScreenRange(n), this.clazz, o)
                            }
                    }
                }).call(o.prototype), t.SearchHighlight = o
            }), ace.define("ace/edit_session/fold_line", [], function(e, t, n) {
                "use strict";
                var r = e("../range").Range;

                function i(e, t) {
                    this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
                    var n = t[t.length - 1];
                    this.range = new r(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e) {
                        e.setFoldLine(this)
                    }, this)
                }(function() {
                    this.shiftRow = function(e) {
                        this.start.row += e, this.end.row += e, this.folds.forEach(function(t) {
                            t.start.row += e, t.end.row += e
                        })
                    }, this.addFold = function(e) {
                        if (e.sameRow) {
                            if (e.start.row < this.startRow || e.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
                            this.folds.push(e), this.folds.sort(function(e, t) {
                                return -e.range.compareEnd(t.start.row, t.start.column)
                            }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
                        } else if (e.start.row == this.end.row) this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
                        else {
                            if (e.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                            this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
                        }
                        e.foldLine = this
                    }, this.containsRow = function(e) {
                        return e >= this.start.row && e <= this.end.row
                    }, this.walk = function(e, t, n) {
                        var r, i, o = 0,
                            s = this.folds,
                            a = !0;
                        null == t && (t = this.end.row, n = this.end.column);
                        for (var l = 0; l < s.length; l++) {
                            if (-1 == (i = (r = s[l]).range.compareStart(t, n))) return void e(null, t, n, o, a);
                            if (!e(null, r.start.row, r.start.column, o, a) && e(r.placeholder, r.start.row, r.start.column, o) || 0 === i) return;
                            a = !r.sameRow, o = r.end.column
                        }
                        e(null, t, n, o, a)
                    }, this.getNextFoldTo = function(e, t) {
                        for (var n, r, i = 0; i < this.folds.length; i++) {
                            if (-1 == (r = (n = this.folds[i]).range.compareEnd(e, t))) return {
                                fold: n,
                                kind: "after"
                            };
                            if (0 === r) return {
                                fold: n,
                                kind: "inside"
                            }
                        }
                        return null
                    }, this.addRemoveChars = function(e, t, n) {
                        var r, i, o = this.getNextFoldTo(e, t);
                        if (o)
                            if (r = o.fold, "inside" == o.kind && r.start.column != t && r.start.row != e) window.console && window.console.log(e, t, r);
                            else if (r.start.row == e) {
                                var s = (i = this.folds).indexOf(r);
                                for (0 === s && (this.start.column += n); s < i.length; s++) {
                                    if ((r = i[s]).start.column += n, !r.sameRow) return;
                                    r.end.column += n
                                }
                                this.end.column += n
                            }
                    }, this.split = function(e, t) {
                        var n = this.getNextFoldTo(e, t);
                        if (!n || "inside" == n.kind) return null;
                        var r = n.fold,
                            o = this.folds,
                            s = this.foldData,
                            a = o.indexOf(r),
                            l = o[a - 1];
                        this.end.row = l.end.row, this.end.column = l.end.column;
                        var c = new i(s, o = o.splice(a, o.length - a));
                        return s.splice(s.indexOf(this) + 1, 0, c), c
                    }, this.merge = function(e) {
                        for (var t = e.folds, n = 0; n < t.length; n++) this.addFold(t[n]);
                        var r = this.foldData;
                        r.splice(r.indexOf(e), 1)
                    }, this.toString = function() {
                        var e = [this.range.toString() + ": ["];
                        return this.folds.forEach(function(t) {
                            e.push("  " + t.toString())
                        }), e.push("]"), e.join("\n")
                    }, this.idxToPosition = function(e) {
                        for (var t = 0, n = 0; n < this.folds.length; n++) {
                            var r = this.folds[n];
                            if ((e -= r.start.column - t) < 0) return {
                                row: r.start.row,
                                column: r.start.column + e
                            };
                            if ((e -= r.placeholder.length) < 0) return r.start;
                            t = r.end.column
                        }
                        return {
                            row: this.end.row,
                            column: this.end.column + e
                        }
                    }
                }).call(i.prototype), t.FoldLine = i
            }), ace.define("ace/range_list", [], function(e, t, n) {
                "use strict";
                var r = e("./range").Range.comparePoints,
                    i = function() {
                        this.ranges = []
                    };
                (function() {
                    this.comparePoints = r, this.pointIndex = function(e, t, n) {
                        for (var i = this.ranges, o = n || 0; o < i.length; o++) {
                            var s = i[o],
                                a = r(e, s.end);
                            if (!(a > 0)) {
                                var l = r(e, s.start);
                                return 0 === a ? t && 0 !== l ? -o - 2 : o : l > 0 || 0 === l && !t ? o : -o - 1
                            }
                        }
                        return -o - 1
                    }, this.add = function(e) {
                        var t = !e.isEmpty(),
                            n = this.pointIndex(e.start, t);
                        n < 0 && (n = -n - 1);
                        var r = this.pointIndex(e.end, t, n);
                        return r < 0 ? r = -r - 1 : r++, this.ranges.splice(n, r - n, e)
                    }, this.addList = function(e) {
                        for (var t = [], n = e.length; n--;) t.push.apply(t, this.add(e[n]));
                        return t
                    }, this.substractPoint = function(e) {
                        var t = this.pointIndex(e);
                        if (t >= 0) return this.ranges.splice(t, 1)
                    }, this.merge = function() {
                        for (var e, t = [], n = this.ranges, i = (n = n.sort(function(e, t) {
                            return r(e.start, t.start)
                        }))[0], o = 1; o < n.length; o++) {
                            e = i, i = n[o];
                            var s = r(e.end, i.start);
                            s < 0 || (0 != s || e.isEmpty() || i.isEmpty()) && (r(e.end, i.end) < 0 && (e.end.row = i.end.row, e.end.column = i.end.column), n.splice(o, 1), t.push(i), i = e, o--)
                        }
                        return this.ranges = n, t
                    }, this.contains = function(e, t) {
                        return this.pointIndex({
                            row: e,
                            column: t
                        }) >= 0
                    }, this.containsPoint = function(e) {
                        return this.pointIndex(e) >= 0
                    }, this.rangeAtPoint = function(e) {
                        var t = this.pointIndex(e);
                        if (t >= 0) return this.ranges[t]
                    }, this.clipRows = function(e, t) {
                        var n = this.ranges;
                        if (n[0].start.row > t || n[n.length - 1].start.row < e) return [];
                        var r = this.pointIndex({
                            row: e,
                            column: 0
                        });
                        r < 0 && (r = -r - 1);
                        var i = this.pointIndex({
                            row: t,
                            column: 0
                        }, r);
                        i < 0 && (i = -i - 1);
                        for (var o = [], s = r; s < i; s++) o.push(n[s]);
                        return o
                    }, this.removeAll = function() {
                        return this.ranges.splice(0, this.ranges.length)
                    }, this.attach = function(e) {
                        this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
                    }, this.detach = function() {
                        this.session && (this.session.removeListener("change", this.onChange), this.session = null)
                    }, this.$onChange = function(e) {
                        for (var t = e.start, n = e.end, r = t.row, i = n.row, o = this.ranges, s = 0, a = o.length; s < a; s++) {
                            if ((u = o[s]).end.row >= r) break
                        }
                        if ("insert" == e.action)
                            for (var l = i - r, c = -t.column + n.column; s < a; s++) {
                                if ((u = o[s]).start.row > r) break;
                                if (u.start.row == r && u.start.column >= t.column && (u.start.column == t.column && this.$insertRight || (u.start.column += c, u.start.row += l)), u.end.row == r && u.end.column >= t.column) {
                                    if (u.end.column == t.column && this.$insertRight) continue;
                                    u.end.column == t.column && c > 0 && s < a - 1 && u.end.column > u.start.column && u.end.column == o[s + 1].start.column && (u.end.column -= c), u.end.column += c, u.end.row += l
                                }
                            } else
                            for (l = r - i, c = t.column - n.column; s < a; s++) {
                                if ((u = o[s]).start.row > i) break;
                                u.end.row < i && (r < u.end.row || r == u.end.row && t.column < u.end.column) ? (u.end.row = r, u.end.column = t.column) : u.end.row == i ? u.end.column <= n.column ? (l || u.end.column > t.column) && (u.end.column = t.column, u.end.row = t.row) : (u.end.column += c, u.end.row += l) : u.end.row > i && (u.end.row += l), u.start.row < i && (r < u.start.row || r == u.start.row && t.column < u.start.column) ? (u.start.row = r, u.start.column = t.column) : u.start.row == i ? u.start.column <= n.column ? (l || u.start.column > t.column) && (u.start.column = t.column, u.start.row = t.row) : (u.start.column += c, u.start.row += l) : u.start.row > i && (u.start.row += l)
                            }
                        if (0 != l && s < a)
                            for (; s < a; s++) {
                                var u;
                                (u = o[s]).start.row += l, u.end.row += l
                            }
                    }
                }).call(i.prototype), t.RangeList = i
            }), ace.define("ace/edit_session/fold", [], function(e, t, n) {
                "use strict";
                var r = e("../range_list").RangeList,
                    i = e("../lib/oop"),
                    o = t.Fold = function(e, t) {
                        this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
                    };

                function s(e, t) {
                    e.row -= t.row, 0 == e.row && (e.column -= t.column)
                }

                function a(e, t) {
                    0 == e.row && (e.column += t.column), e.row += t.row
                }
                i.inherits(o, r),
                    function() {
                        this.toString = function() {
                            return '"' + this.placeholder + '" ' + this.range.toString()
                        }, this.setFoldLine = function(e) {
                            this.foldLine = e, this.subFolds.forEach(function(t) {
                                t.setFoldLine(e)
                            })
                        }, this.clone = function() {
                            var e = this.range.clone(),
                                t = new o(e, this.placeholder);
                            return this.subFolds.forEach(function(e) {
                                t.subFolds.push(e.clone())
                            }), t.collapseChildren = this.collapseChildren, t
                        }, this.addSubFold = function(e) {
                            if (!this.range.isEqual(e)) {
                                var t, n;
                                t = e, n = this.start, s(t.start, n), s(t.end, n);
                                for (var r = e.start.row, i = e.start.column, o = 0, a = -1; o < this.subFolds.length && 1 == (a = this.subFolds[o].range.compare(r, i)); o++);
                                var l = this.subFolds[o],
                                    c = 0;
                                if (0 == a) {
                                    if (l.range.containsRange(e)) return l.addSubFold(e);
                                    c = 1
                                }
                                r = e.range.end.row, i = e.range.end.column;
                                var u = o;
                                for (a = -1; u < this.subFolds.length && 1 == (a = this.subFolds[u].range.compare(r, i)); u++);
                                0 == a && u++;
                                for (var h = this.subFolds.splice(o, u - o, e), d = 0 == a ? h.length - 1 : h.length, f = c; f < d; f++) e.addSubFold(h[f]);
                                return e.setFoldLine(this.foldLine), e
                            }
                        }, this.restoreRange = function(e) {
                            return function(e, t) {
                                a(e.start, t), a(e.end, t)
                            }(e, this.start)
                        }
                    }.call(o.prototype)
            }), ace.define("ace/edit_session/folding", [], function(e, t, n) {
                "use strict";
                var r = e("../range").Range,
                    i = e("./fold_line").FoldLine,
                    o = e("./fold").Fold,
                    s = e("../token_iterator").TokenIterator;
                t.Folding = function() {
                    this.getFoldAt = function(e, t, n) {
                        var r = this.getFoldLine(e);
                        if (!r) return null;
                        for (var i = r.folds, o = 0; o < i.length; o++) {
                            var s = i[o].range;
                            if (s.contains(e, t)) {
                                if (1 == n && s.isEnd(e, t) && !s.isEmpty()) continue;
                                if (-1 == n && s.isStart(e, t) && !s.isEmpty()) continue;
                                return i[o]
                            }
                        }
                    }, this.getFoldsInRange = function(e) {
                        var t = e.start,
                            n = e.end,
                            r = this.$foldData,
                            i = [];
                        t.column += 1, n.column -= 1;
                        for (var o = 0; o < r.length; o++) {
                            var s = r[o].range.compareRange(e);
                            if (2 != s) {
                                if (-2 == s) break;
                                for (var a = r[o].folds, l = 0; l < a.length; l++) {
                                    var c = a[l];
                                    if (-2 == (s = c.range.compareRange(e))) break;
                                    if (2 != s) {
                                        if (42 == s) break;
                                        i.push(c)
                                    }
                                }
                            }
                        }
                        return t.column -= 1, n.column += 1, i
                    }, this.getFoldsInRangeList = function(e) {
                        if (Array.isArray(e)) {
                            var t = [];
                            e.forEach(function(e) {
                                t = t.concat(this.getFoldsInRange(e))
                            }, this)
                        } else t = this.getFoldsInRange(e);
                        return t
                    }, this.getAllFolds = function() {
                        for (var e = [], t = this.$foldData, n = 0; n < t.length; n++)
                            for (var r = 0; r < t[n].folds.length; r++) e.push(t[n].folds[r]);
                        return e
                    }, this.getFoldStringAt = function(e, t, n, r) {
                        if (!(r = r || this.getFoldLine(e))) return null;
                        for (var i, o, s = {
                            end: {
                                column: 0
                            }
                        }, a = 0; a < r.folds.length; a++) {
                            var l = (o = r.folds[a]).range.compareEnd(e, t);
                            if (-1 == l) {
                                i = this.getLine(o.start.row).substring(s.end.column, o.start.column);
                                break
                            }
                            if (0 === l) return null;
                            s = o
                        }
                        return i || (i = this.getLine(o.start.row).substring(s.end.column)), -1 == n ? i.substring(0, t - s.end.column) : 1 == n ? i.substring(t - s.end.column) : i
                    }, this.getFoldLine = function(e, t) {
                        var n = this.$foldData,
                            r = 0;
                        for (t && (r = n.indexOf(t)), -1 == r && (r = 0); r < n.length; r++) {
                            var i = n[r];
                            if (i.start.row <= e && i.end.row >= e) return i;
                            if (i.end.row > e) return null
                        }
                        return null
                    }, this.getNextFoldLine = function(e, t) {
                        var n = this.$foldData,
                            r = 0;
                        for (t && (r = n.indexOf(t)), -1 == r && (r = 0); r < n.length; r++) {
                            var i = n[r];
                            if (i.end.row >= e) return i
                        }
                        return null
                    }, this.getFoldedRowCount = function(e, t) {
                        for (var n = this.$foldData, r = t - e + 1, i = 0; i < n.length; i++) {
                            var o = n[i],
                                s = o.end.row,
                                a = o.start.row;
                            if (s >= t) {
                                a < t && (a >= e ? r -= t - a : r = 0);
                                break
                            }
                            s >= e && (r -= a >= e ? s - a : s - e + 1)
                        }
                        return r
                    }, this.$addFoldLine = function(e) {
                        return this.$foldData.push(e), this.$foldData.sort(function(e, t) {
                            return e.start.row - t.start.row
                        }), e
                    }, this.addFold = function(e, t) {
                        var n, r = this.$foldData,
                            s = !1;
                        e instanceof o ? n = e : (n = new o(t, e)).collapseChildren = t.collapseChildren, this.$clipRangeToDocument(n.range);
                        var a = n.start.row,
                            l = n.start.column,
                            c = n.end.row,
                            u = n.end.column,
                            h = this.getFoldAt(a, l, 1),
                            d = this.getFoldAt(c, u, -1);
                        if (h && d == h) return h.addSubFold(n);
                        h && !h.range.isStart(a, l) && this.removeFold(h), d && !d.range.isEnd(c, u) && this.removeFold(d);
                        var f = this.getFoldsInRange(n.range);
                        f.length > 0 && (this.removeFolds(f), f.forEach(function(e) {
                            n.addSubFold(e)
                        }));
                        for (var p = 0; p < r.length; p++) {
                            var g = r[p];
                            if (c == g.start.row) {
                                g.addFold(n), s = !0;
                                break
                            }
                            if (a == g.end.row) {
                                if (g.addFold(n), s = !0, !n.sameRow) {
                                    var m = r[p + 1];
                                    if (m && m.start.row == c) {
                                        g.merge(m);
                                        break
                                    }
                                }
                                break
                            }
                            if (c <= g.start.row) break
                        }
                        return s || (g = this.$addFoldLine(new i(this.$foldData, n))), this.$useWrapMode ? this.$updateWrapData(g.start.row, g.start.row) : this.$updateRowLengthCache(g.start.row, g.start.row), this.$modified = !0, this._signal("changeFold", {
                            data: n,
                            action: "add"
                        }), n
                    }, this.addFolds = function(e) {
                        e.forEach(function(e) {
                            this.addFold(e)
                        }, this)
                    }, this.removeFold = function(e) {
                        var t = e.foldLine,
                            n = t.start.row,
                            r = t.end.row,
                            i = this.$foldData,
                            o = t.folds;
                        if (1 == o.length) i.splice(i.indexOf(t), 1);
                        else if (t.range.isEnd(e.end.row, e.end.column)) o.pop(), t.end.row = o[o.length - 1].end.row, t.end.column = o[o.length - 1].end.column;
                        else if (t.range.isStart(e.start.row, e.start.column)) o.shift(), t.start.row = o[0].start.row, t.start.column = o[0].start.column;
                        else if (e.sameRow) o.splice(o.indexOf(e), 1);
                        else {
                            var s = t.split(e.start.row, e.start.column);
                            (o = s.folds).shift(), s.start.row = o[0].start.row, s.start.column = o[0].start.column
                        }
                        this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, r) : this.$updateRowLengthCache(n, r)), this.$modified = !0, this._signal("changeFold", {
                            data: e,
                            action: "remove"
                        })
                    }, this.removeFolds = function(e) {
                        for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
                        t.forEach(function(e) {
                            this.removeFold(e)
                        }, this), this.$modified = !0
                    }, this.expandFold = function(e) {
                        this.removeFold(e), e.subFolds.forEach(function(t) {
                            e.restoreRange(t), this.addFold(t)
                        }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
                    }, this.expandFolds = function(e) {
                        e.forEach(function(e) {
                            this.expandFold(e)
                        }, this)
                    }, this.unfold = function(e, t) {
                        var n, i;
                        if (null == e ? (n = new r(0, 0, this.getLength(), 0), t = !0) : n = "number" == typeof e ? new r(e, 0, e, this.getLine(e).length) : "row" in e ? r.fromPoints(e, e) : e, i = this.getFoldsInRangeList(n), t) this.removeFolds(i);
                        else
                            for (var o = i; o.length;) this.expandFolds(o), o = this.getFoldsInRangeList(n);
                        if (i.length) return i
                    }, this.isRowFolded = function(e, t) {
                        return !!this.getFoldLine(e, t)
                    }, this.getRowFoldEnd = function(e, t) {
                        var n = this.getFoldLine(e, t);
                        return n ? n.end.row : e
                    }, this.getRowFoldStart = function(e, t) {
                        var n = this.getFoldLine(e, t);
                        return n ? n.start.row : e
                    }, this.getFoldDisplayLine = function(e, t, n, r, i) {
                        null == r && (r = e.start.row), null == i && (i = 0), null == t && (t = e.end.row), null == n && (n = this.getLine(t).length);
                        var o = this.doc,
                            s = "";
                        return e.walk(function(e, t, n, a) {
                            if (!(t < r)) {
                                if (t == r) {
                                    if (n < i) return;
                                    a = Math.max(i, a)
                                }
                                s += null != e ? e : o.getLine(t).substring(a, n)
                            }
                        }, t, n), s
                    }, this.getDisplayLine = function(e, t, n, r) {
                        var i, o = this.getFoldLine(e);
                        return o ? this.getFoldDisplayLine(o, e, t, n, r) : (i = this.doc.getLine(e)).substring(r || 0, t || i.length)
                    }, this.$cloneFoldData = function() {
                        var e = [];
                        return e = this.$foldData.map(function(t) {
                            var n = t.folds.map(function(e) {
                                return e.clone()
                            });
                            return new i(e, n)
                        })
                    }, this.toggleFold = function(e) {
                        var t, n, r = this.selection.getRange();
                        if (r.isEmpty()) {
                            var i = r.start;
                            if (t = this.getFoldAt(i.row, i.column)) return void this.expandFold(t);
                            (n = this.findMatchingBracket(i)) ? 1 == r.comparePoint(n) ? r.end = n : (r.start = n, r.start.column++, r.end.column--): (n = this.findMatchingBracket({
                                row: i.row,
                                column: i.column + 1
                            })) ? (1 == r.comparePoint(n) ? r.end = n : r.start = n, r.start.column++) : r = this.getCommentFoldRange(i.row, i.column) || r
                        } else {
                            var o = this.getFoldsInRange(r);
                            if (e && o.length) return void this.expandFolds(o);
                            1 == o.length && (t = o[0])
                        }
                        if (t || (t = this.getFoldAt(r.start.row, r.start.column)), t && t.range.toString() == r.toString()) this.expandFold(t);
                        else {
                            var s = "...";
                            if (!r.isMultiLine()) {
                                if ((s = this.getTextRange(r)).length < 4) return;
                                s = s.trim().substring(0, 2) + ".."
                            }
                            this.addFold(s, r)
                        }
                    }, this.getCommentFoldRange = function(e, t, n) {
                        var i = new s(this, e, t),
                            o = i.getCurrentToken(),
                            a = o.type;
                        if (o && /^comment|string/.test(a)) {
                            "comment" == (a = a.match(/comment|string/)[0]) && (a += "|doc-start");
                            var l = new RegExp(a),
                                c = new r;
                            if (1 != n) {
                                do {
                                    o = i.stepBackward()
                                } while (o && l.test(o.type));
                                i.stepForward()
                            }
                            if (c.start.row = i.getCurrentTokenRow(), c.start.column = i.getCurrentTokenColumn() + 2, i = new s(this, e, t), -1 != n) {
                                var u = -1;
                                do {
                                    if (o = i.stepForward(), -1 == u) {
                                        var h = this.getState(i.$row);
                                        l.test(h) || (u = i.$row)
                                    } else if (i.$row > u) break
                                } while (o && l.test(o.type));
                                o = i.stepBackward()
                            } else o = i.getCurrentToken();
                            return c.end.row = i.getCurrentTokenRow(), c.end.column = i.getCurrentTokenColumn() + o.value.length - 2, c
                        }
                    }, this.foldAll = function(e, t, n) {
                        null == n && (n = 1e5);
                        var r = this.foldWidgets;
                        if (r) {
                            t = t || this.getLength();
                            for (var i = e = e || 0; i < t; i++)
                                if (null == r[i] && (r[i] = this.getFoldWidget(i)), "start" == r[i]) {
                                    var o = this.getFoldWidgetRange(i);
                                    if (o && o.isMultiLine() && o.end.row <= t && o.start.row >= e) {
                                        i = o.end.row;
                                        try {
                                            var s = this.addFold("...", o);
                                            s && (s.collapseChildren = n)
                                        } catch (e) {}
                                    }
                                }
                        }
                    }, this.$foldStyles = {
                        manual: 1,
                        markbegin: 1,
                        markbeginend: 1
                    }, this.$foldStyle = "markbegin", this.setFoldStyle = function(e) {
                        if (!this.$foldStyles[e]) throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
                        if (this.$foldStyle != e) {
                            this.$foldStyle = e, "manual" == e && this.unfold();
                            var t = this.$foldMode;
                            this.$setFolding(null), this.$setFolding(t)
                        }
                    }, this.$setFolding = function(e) {
                        this.$foldMode != e && (this.$foldMode = e, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)) : this.foldWidgets = null)
                    }, this.getParentFoldRangeData = function(e, t) {
                        var n = this.foldWidgets;
                        if (!n || t && n[e]) return {};
                        for (var r, i = e - 1; i >= 0;) {
                            var o = n[i];
                            if (null == o && (o = n[i] = this.getFoldWidget(i)), "start" == o) {
                                var s = this.getFoldWidgetRange(i);
                                if (r || (r = s), s && s.end.row >= e) break
                            }
                            i--
                        }
                        return {
                            range: -1 !== i && s,
                            firstRange: r
                        }
                    }, this.onFoldWidgetClick = function(e, t) {
                        var n = {
                            children: (t = t.domEvent).shiftKey,
                            all: t.ctrlKey || t.metaKey,
                            siblings: t.altKey
                        };
                        if (!this.$toggleFoldWidget(e, n)) {
                            var r = t.target || t.srcElement;
                            r && /ace_fold-widget/.test(r.className) && (r.className += " ace_invalid")
                        }
                    }, this.$toggleFoldWidget = function(e, t) {
                        if (this.getFoldWidget) {
                            var n = this.getFoldWidget(e),
                                r = this.getLine(e),
                                i = "end" === n ? -1 : 1,
                                o = this.getFoldAt(e, -1 === i ? 0 : r.length, i);
                            if (o) return t.children || t.all ? this.removeFold(o) : this.expandFold(o), o;
                            var s = this.getFoldWidgetRange(e, !0);
                            if (s && !s.isMultiLine() && (o = this.getFoldAt(s.start.row, s.start.column, 1)) && s.isEqual(o.range)) return this.removeFold(o), o;
                            if (t.siblings) {
                                var a = this.getParentFoldRangeData(e);
                                if (a.range) var l = a.range.start.row + 1,
                                    c = a.range.end.row;
                                this.foldAll(l, c, t.all ? 1e4 : 0)
                            } else t.children ? (c = s ? s.end.row : this.getLength(), this.foldAll(e + 1, c, t.all ? 1e4 : 0)) : s && (t.all && (s.collapseChildren = 1e4), this.addFold("...", s));
                            return s
                        }
                    }, this.toggleFoldWidget = function(e) {
                        var t = this.selection.getCursor().row;
                        t = this.getRowFoldStart(t);
                        var n = this.$toggleFoldWidget(t, {});
                        if (!n) {
                            var r = this.getParentFoldRangeData(t, !0);
                            if (n = r.range || r.firstRange) {
                                t = n.start.row;
                                var i = this.getFoldAt(t, this.getLine(t).length, 1);
                                i ? this.removeFold(i) : this.addFold("...", n)
                            }
                        }
                    }, this.updateFoldWidgets = function(e) {
                        var t = e.start.row,
                            n = e.end.row - t;
                        if (0 === n) this.foldWidgets[t] = null;
                        else if ("remove" == e.action) this.foldWidgets.splice(t, n + 1, null);
                        else {
                            var r = Array(n + 1);
                            r.unshift(t, 1), this.foldWidgets.splice.apply(this.foldWidgets, r)
                        }
                    }, this.tokenizerUpdateFoldWidgets = function(e) {
                        var t = e.data;
                        t.first != t.last && this.foldWidgets.length > t.first && this.foldWidgets.splice(t.first, this.foldWidgets.length)
                    }
                }
            }), ace.define("ace/edit_session/bracket_match", [], function(e, t, n) {
                "use strict";
                var r = e("../token_iterator").TokenIterator,
                    i = e("../range").Range;
                t.BracketMatch = function() {
                    this.findMatchingBracket = function(e, t) {
                        if (0 == e.column) return null;
                        var n = t || this.getLine(e.row).charAt(e.column - 1);
                        if ("" == n) return null;
                        var r = n.match(/([\(\[\{])|([\)\]\}])/);
                        return r ? r[1] ? this.$findClosingBracket(r[1], e) : this.$findOpeningBracket(r[2], e) : null
                    }, this.getBracketRange = function(e) {
                        var t, n = this.getLine(e.row),
                            r = !0,
                            o = n.charAt(e.column - 1),
                            s = o && o.match(/([\(\[\{])|([\)\]\}])/);
                        if (s || (o = n.charAt(e.column), e = {
                            row: e.row,
                            column: e.column + 1
                        }, s = o && o.match(/([\(\[\{])|([\)\]\}])/), r = !1), !s) return null;
                        if (s[1]) {
                            if (!(a = this.$findClosingBracket(s[1], e))) return null;
                            t = i.fromPoints(e, a), r || (t.end.column++, t.start.column--), t.cursor = t.end
                        } else {
                            var a;
                            if (!(a = this.$findOpeningBracket(s[2], e))) return null;
                            t = i.fromPoints(a, e), r || (t.start.column++, t.end.column--), t.cursor = t.start
                        }
                        return t
                    }, this.$brackets = {
                        ")": "(",
                        "(": ")",
                        "]": "[",
                        "[": "]",
                        "{": "}",
                        "}": "{",
                        "<": ">",
                        ">": "<"
                    }, this.$findOpeningBracket = function(e, t, n) {
                        var i = this.$brackets[e],
                            o = 1,
                            s = new r(this, t.row, t.column),
                            a = s.getCurrentToken();
                        if (a || (a = s.stepForward()), a) {
                            n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
                            for (var l = t.column - s.getCurrentTokenColumn() - 2, c = a.value;;) {
                                for (; l >= 0;) {
                                    var u = c.charAt(l);
                                    if (u == i) {
                                        if (0 == (o -= 1)) return {
                                            row: s.getCurrentTokenRow(),
                                            column: l + s.getCurrentTokenColumn()
                                        }
                                    } else u == e && (o += 1);
                                    l -= 1
                                }
                                do {
                                    a = s.stepBackward()
                                } while (a && !n.test(a.type));
                                if (null == a) break;
                                l = (c = a.value).length - 1
                            }
                            return null
                        }
                    }, this.$findClosingBracket = function(e, t, n) {
                        var i = this.$brackets[e],
                            o = 1,
                            s = new r(this, t.row, t.column),
                            a = s.getCurrentToken();
                        if (a || (a = s.stepForward()), a) {
                            n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
                            for (var l = t.column - s.getCurrentTokenColumn();;) {
                                for (var c = a.value, u = c.length; l < u;) {
                                    var h = c.charAt(l);
                                    if (h == i) {
                                        if (0 == (o -= 1)) return {
                                            row: s.getCurrentTokenRow(),
                                            column: l + s.getCurrentTokenColumn()
                                        }
                                    } else h == e && (o += 1);
                                    l += 1
                                }
                                do {
                                    a = s.stepForward()
                                } while (a && !n.test(a.type));
                                if (null == a) break;
                                l = 0
                            }
                            return null
                        }
                    }
                }
            }), ace.define("ace/edit_session", [], function(e, t, n) {
                "use strict";
                var i = e("./lib/oop"),
                    o = e("./lib/lang"),
                    s = e("./bidihandler").BidiHandler,
                    a = e("./config"),
                    l = e("./lib/event_emitter").EventEmitter,
                    c = e("./selection").Selection,
                    u = e("./mode/text").Mode,
                    h = e("./range").Range,
                    d = e("./document").Document,
                    f = e("./background_tokenizer").BackgroundTokenizer,
                    p = e("./search_highlight").SearchHighlight,
                    g = function e(t, n) {
                        this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.id = "session" + ++e.$uid, this.$foldData.toString = function() {
                            return this.join("\n")
                        }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == r(t) && t.getLine || (t = new d(t)), this.setDocument(t), this.selection = new c(this), this.$bidiHandler = new s(this), a.resetOptions(this), this.setMode(n), a._signal("session", this)
                    };
                g.$uid = 0,
                    function() {
                        i.implement(this, l), this.setDocument = function(e) {
                            this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
                        }, this.getDocument = function() {
                            return this.doc
                        }, this.$resetRowCache = function(e) {
                            if (!e) return this.$docRowCache = [], void(this.$screenRowCache = []);
                            var t = this.$docRowCache.length,
                                n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
                            t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t))
                        }, this.$getRowCacheIndex = function(e, t) {
                            for (var n = 0, r = e.length - 1; n <= r;) {
                                var i = n + r >> 1,
                                    o = e[i];
                                if (t > o) n = i + 1;
                                else {
                                    if (!(t < o)) return i;
                                    r = i - 1
                                }
                            }
                            return n - 1
                        }, this.resetCaches = function() {
                            this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
                        }, this.onChangeFold = function(e) {
                            var t = e.data;
                            this.$resetRowCache(t.start.row)
                        }, this.onChange = function(e) {
                            this.$modified = !0, this.$bidiHandler.onChange(e), this.$resetRowCache(e.start.row);
                            var t = this.$updateInternalDataOnChange(e);
                            !this.$fromUndo && this.$undoManager && (t && t.length && (this.$undoManager.add({
                                action: "removeFolds",
                                folds: t
                            }, this.mergeUndoDeltas), this.mergeUndoDeltas = !0), this.$undoManager.add(e, this.mergeUndoDeltas), this.mergeUndoDeltas = !0, this.$informUndoManager.schedule()), this.bgTokenizer && this.bgTokenizer.$updateOnChange(e), this._signal("change", e)
                        }, this.setValue = function(e) {
                            this.doc.setValue(e), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.setUndoManager(this.$undoManager), this.getUndoManager().reset()
                        }, this.getValue = this.toString = function() {
                            return this.doc.getValue()
                        }, this.getSelection = function() {
                            return this.selection
                        }, this.getState = function(e) {
                            return this.bgTokenizer.getState(e)
                        }, this.getTokens = function(e) {
                            return this.bgTokenizer.getTokens(e)
                        }, this.getTokenAt = function(e, t) {
                            var n, r = this.bgTokenizer.getTokens(e),
                                i = 0;
                            if (null == t) {
                                var o = r.length - 1;
                                i = this.getLine(e).length
                            } else
                                for (o = 0; o < r.length && !((i += r[o].value.length) >= t); o++);
                            return (n = r[o]) ? (n.index = o, n.start = i - n.value.length, n) : null
                        }, this.setUndoManager = function(e) {
                            if (this.$undoManager = e, this.$informUndoManager && this.$informUndoManager.cancel(), e) {
                                var t = this;
                                e.addSession(this), this.$syncInformUndoManager = function() {
                                    t.$informUndoManager.cancel(), t.mergeUndoDeltas = !1
                                }, this.$informUndoManager = o.delayedCall(this.$syncInformUndoManager)
                            } else this.$syncInformUndoManager = function() {}
                        }, this.markUndoGroup = function() {
                            this.$syncInformUndoManager && this.$syncInformUndoManager()
                        }, this.$defaultUndoManager = {
                            undo: function() {},
                            redo: function() {},
                            reset: function() {},
                            add: function() {},
                            addSelection: function() {},
                            startNewGroup: function() {},
                            addSession: function() {}
                        }, this.getUndoManager = function() {
                            return this.$undoManager || this.$defaultUndoManager
                        }, this.getTabString = function() {
                            return this.getUseSoftTabs() ? o.stringRepeat(" ", this.getTabSize()) : "\t"
                        }, this.setUseSoftTabs = function(e) {
                            this.setOption("useSoftTabs", e)
                        }, this.getUseSoftTabs = function() {
                            return this.$useSoftTabs && !this.$mode.$indentWithTabs
                        }, this.setTabSize = function(e) {
                            this.setOption("tabSize", e)
                        }, this.getTabSize = function() {
                            return this.$tabSize
                        }, this.isTabStop = function(e) {
                            return this.$useSoftTabs && e.column % this.$tabSize == 0
                        }, this.setNavigateWithinSoftTabs = function(e) {
                            this.setOption("navigateWithinSoftTabs", e)
                        }, this.getNavigateWithinSoftTabs = function() {
                            return this.$navigateWithinSoftTabs
                        }, this.$overwrite = !1, this.setOverwrite = function(e) {
                            this.setOption("overwrite", e)
                        }, this.getOverwrite = function() {
                            return this.$overwrite
                        }, this.toggleOverwrite = function() {
                            this.setOverwrite(!this.$overwrite)
                        }, this.addGutterDecoration = function(e, t) {
                            this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._signal("changeBreakpoint", {})
                        }, this.removeGutterDecoration = function(e, t) {
                            this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._signal("changeBreakpoint", {})
                        }, this.getBreakpoints = function() {
                            return this.$breakpoints
                        }, this.setBreakpoints = function(e) {
                            this.$breakpoints = [];
                            for (var t = 0; t < e.length; t++) this.$breakpoints[e[t]] = "ace_breakpoint";
                            this._signal("changeBreakpoint", {})
                        }, this.clearBreakpoints = function() {
                            this.$breakpoints = [], this._signal("changeBreakpoint", {})
                        }, this.setBreakpoint = function(e, t) {
                            void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
                        }, this.clearBreakpoint = function(e) {
                            delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
                        }, this.addMarker = function(e, t, n, r) {
                            var i = this.$markerId++,
                                o = {
                                    range: e,
                                    type: n || "line",
                                    renderer: "function" == typeof n ? n : null,
                                    clazz: t,
                                    inFront: !!r,
                                    id: i
                                };
                            return r ? (this.$frontMarkers[i] = o, this._signal("changeFrontMarker")) : (this.$backMarkers[i] = o, this._signal("changeBackMarker")), i
                        }, this.addDynamicMarker = function(e, t) {
                            if (e.update) {
                                var n = this.$markerId++;
                                return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._signal("changeFrontMarker")) : (this.$backMarkers[n] = e, this._signal("changeBackMarker")), e
                            }
                        }, this.removeMarker = function(e) {
                            var t = this.$frontMarkers[e] || this.$backMarkers[e];
                            t && (delete(t.inFront ? this.$frontMarkers : this.$backMarkers)[e], this._signal(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
                        }, this.getMarkers = function(e) {
                            return e ? this.$frontMarkers : this.$backMarkers
                        }, this.highlight = function(e) {
                            if (!this.$searchHighlight) {
                                var t = new p(null, "ace_selected-word", "text");
                                this.$searchHighlight = this.addDynamicMarker(t)
                            }
                            this.$searchHighlight.setRegexp(e)
                        }, this.highlightLines = function(e, t, n, r) {
                            "number" != typeof t && (n = t, t = e), n || (n = "ace_step");
                            var i = new h(e, 0, t, 1 / 0);
                            return i.id = this.addMarker(i, n, "fullLine", r), i
                        }, this.setAnnotations = function(e) {
                            this.$annotations = e, this._signal("changeAnnotation", {})
                        }, this.getAnnotations = function() {
                            return this.$annotations || []
                        }, this.clearAnnotations = function() {
                            this.setAnnotations([])
                        }, this.$detectNewLine = function(e) {
                            var t = e.match(/^.*?(\r?\n)/m);
                            this.$autoNewLine = t ? t[1] : "\n"
                        }, this.getWordRange = function(e, t) {
                            var n = this.getLine(e),
                                r = !1;
                            if (t > 0 && (r = !!n.charAt(t - 1).match(this.tokenRe)), r || (r = !!n.charAt(t).match(this.tokenRe)), r) var i = this.tokenRe;
                            else if (/^\s+$/.test(n.slice(t - 1, t + 1))) i = /\s/;
                            else i = this.nonTokenRe;
                            var o = t;
                            if (o > 0) {
                                do {
                                    o--
                                } while (o >= 0 && n.charAt(o).match(i));
                                o++
                            }
                            for (var s = t; s < n.length && n.charAt(s).match(i);) s++;
                            return new h(e, o, e, s)
                        }, this.getAWordRange = function(e, t) {
                            for (var n = this.getWordRange(e, t), r = this.getLine(n.end.row); r.charAt(n.end.column).match(/[ \t]/);) n.end.column += 1;
                            return n
                        }, this.setNewLineMode = function(e) {
                            this.doc.setNewLineMode(e)
                        }, this.getNewLineMode = function() {
                            return this.doc.getNewLineMode()
                        }, this.setUseWorker = function(e) {
                            this.setOption("useWorker", e)
                        }, this.getUseWorker = function() {
                            return this.$useWorker
                        }, this.onReloadTokenizer = function(e) {
                            var t = e.data;
                            this.bgTokenizer.start(t.first), this._signal("tokenizerUpdate", e)
                        }, this.$modes = a.$modes, this.$mode = null, this.$modeId = null, this.setMode = function(e, t) {
                            if (e && "object" === r(e)) {
                                if (e.getTokenizer) return this.$onChangeMode(e);
                                var n = e,
                                    i = n.path
                            } else i = e || "ace/mode/text";
                            if (this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new u), this.$modes[i] && !n) return this.$onChangeMode(this.$modes[i]), void(t && t());
                            this.$modeId = i, a.loadModule(["mode", i], function(e) {
                                if (this.$modeId !== i) return t && t();
                                this.$modes[i] && !n ? this.$onChangeMode(this.$modes[i]) : e && e.Mode && (e = new e.Mode(n), n || (this.$modes[i] = e, e.$id = i), this.$onChangeMode(e)), t && t()
                            }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)
                        }, this.$onChangeMode = function(e, t) {
                            if (t || (this.$modeId = e.$id), this.$mode !== e) {
                                this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
                                var n = e.getTokenizer();
                                if (void 0 !== n.addEventListener) {
                                    var r = this.onReloadTokenizer.bind(this);
                                    n.addEventListener("update", r)
                                }
                                if (this.bgTokenizer) this.bgTokenizer.setTokenizer(n);
                                else {
                                    this.bgTokenizer = new f(n);
                                    var i = this;
                                    this.bgTokenizer.addEventListener("update", function(e) {
                                        i._signal("tokenizerUpdate", e)
                                    })
                                }
                                this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (e.attachToSession && e.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode"))
                            }
                        }, this.$stopWorker = function() {
                            this.$worker && (this.$worker.terminate(), this.$worker = null)
                        }, this.$startWorker = function() {
                            try {
                                this.$worker = this.$mode.createWorker(this)
                            } catch (e) {
                                a.warn("Could not load worker", e), this.$worker = null
                            }
                        }, this.getMode = function() {
                            return this.$mode
                        }, this.$scrollTop = 0, this.setScrollTop = function(e) {
                            this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e))
                        }, this.getScrollTop = function() {
                            return this.$scrollTop
                        }, this.$scrollLeft = 0, this.setScrollLeft = function(e) {
                            this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e))
                        }, this.getScrollLeft = function() {
                            return this.$scrollLeft
                        }, this.getScreenWidth = function() {
                            return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth
                        }, this.getLineWidgetMaxWidth = function() {
                            if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth;
                            var e = 0;
                            return this.lineWidgets.forEach(function(t) {
                                t && t.screenWidth > e && (e = t.screenWidth)
                            }), this.lineWidgetWidth = e
                        }, this.$computeWidth = function(e) {
                            if (this.$modified || e) {
                                if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
                                for (var t = this.doc.getAllLines(), n = this.$rowLengthCache, r = 0, i = 0, o = this.$foldData[i], s = o ? o.start.row : 1 / 0, a = t.length, l = 0; l < a; l++) {
                                    if (l > s) {
                                        if ((l = o.end.row + 1) >= a) break;
                                        s = (o = this.$foldData[i++]) ? o.start.row : 1 / 0
                                    }
                                    null == n[l] && (n[l] = this.$getStringScreenWidth(t[l])[0]), n[l] > r && (r = n[l])
                                }
                                this.screenWidth = r
                            }
                        }, this.getLine = function(e) {
                            return this.doc.getLine(e)
                        }, this.getLines = function(e, t) {
                            return this.doc.getLines(e, t)
                        }, this.getLength = function() {
                            return this.doc.getLength()
                        }, this.getTextRange = function(e) {
                            return this.doc.getTextRange(e || this.selection.getRange())
                        }, this.insert = function(e, t) {
                            return this.doc.insert(e, t)
                        }, this.remove = function(e) {
                            return this.doc.remove(e)
                        }, this.removeFullLines = function(e, t) {
                            return this.doc.removeFullLines(e, t)
                        }, this.undoChanges = function(e, t) {
                            if (e.length) {
                                this.$fromUndo = !0;
                                for (var n = e.length - 1; - 1 != n; n--) {
                                    var r = e[n];
                                    "insert" == r.action || "remove" == r.action ? this.doc.revertDelta(r) : r.folds && this.addFolds(r.folds)
                                }!t && this.$undoSelect && (e.selectionBefore ? this.selection.fromJSON(e.selectionBefore) : this.selection.setRange(this.$getUndoSelection(e, !0))), this.$fromUndo = !1
                            }
                        }, this.redoChanges = function(e, t) {
                            if (e.length) {
                                this.$fromUndo = !0;
                                for (var n = 0; n < e.length; n++) {
                                    var r = e[n];
                                    "insert" != r.action && "remove" != r.action || this.doc.applyDelta(r)
                                }!t && this.$undoSelect && (e.selectionAfter ? this.selection.fromJSON(e.selectionAfter) : this.selection.setRange(this.$getUndoSelection(e, !1))), this.$fromUndo = !1
                            }
                        }, this.setUndoSelect = function(e) {
                            this.$undoSelect = e
                        }, this.$getUndoSelection = function(e, t) {
                            function n(e) {
                                return t ? "insert" !== e.action : "insert" === e.action
                            }
                            for (var r, i, o = 0; o < e.length; o++) {
                                var s = e[o];
                                s.start && (r ? n(s) ? (i = s.start, -1 == r.compare(i.row, i.column) && r.setStart(i), i = s.end, 1 == r.compare(i.row, i.column) && r.setEnd(i), !0) : (i = s.start, -1 == r.compare(i.row, i.column) && (r = h.fromPoints(s.start, s.start)), !1) : n(s) ? (r = h.fromPoints(s.start, s.end), !0) : (r = h.fromPoints(s.start, s.start), !1))
                            }
                            return r
                        }, this.replace = function(e, t) {
                            return this.doc.replace(e, t)
                        }, this.moveText = function(e, t, n) {
                            var r = this.getTextRange(e),
                                i = this.getFoldsInRange(e),
                                o = h.fromPoints(t, t);
                            if (!n) {
                                this.remove(e);
                                var s = e.start.row - e.end.row;
                                (c = s ? -e.end.column : e.start.column - e.end.column) && (o.start.row == e.end.row && o.start.column > e.end.column && (o.start.column += c), o.end.row == e.end.row && o.end.column > e.end.column && (o.end.column += c)), s && o.start.row >= e.end.row && (o.start.row += s, o.end.row += s)
                            }
                            if (o.end = this.insert(o.start, r), i.length) {
                                var a = e.start,
                                    l = o.start,
                                    c = (s = l.row - a.row, l.column - a.column);
                                this.addFolds(i.map(function(e) {
                                    return (e = e.clone()).start.row == a.row && (e.start.column += c), e.end.row == a.row && (e.end.column += c), e.start.row += s, e.end.row += s, e
                                }))
                            }
                            return o
                        }, this.indentRows = function(e, t, n) {
                            n = n.replace(/\t/g, this.getTabString());
                            for (var r = e; r <= t; r++) this.doc.insertInLine({
                                row: r,
                                column: 0
                            }, n)
                        }, this.outdentRows = function(e) {
                            for (var t = e.collapseRows(), n = new h(0, 0, 0, 0), r = this.getTabSize(), i = t.start.row; i <= t.end.row; ++i) {
                                var o = this.getLine(i);
                                n.start.row = i, n.end.row = i;
                                for (var s = 0; s < r && " " == o.charAt(s); ++s);
                                s < r && "\t" == o.charAt(s) ? (n.start.column = s, n.end.column = s + 1) : (n.start.column = 0, n.end.column = s), this.remove(n)
                            }
                        }, this.$moveLines = function(e, t, n) {
                            if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), n < 0) {
                                if ((i = this.getRowFoldStart(e + n)) < 0) return 0;
                                var r = i - e
                            } else if (n > 0) {
                                var i;
                                if ((i = this.getRowFoldEnd(t + n)) > this.doc.getLength() - 1) return 0;
                                r = i - t
                            } else {
                                e = this.$clipRowToDocument(e);
                                r = (t = this.$clipRowToDocument(t)) - e + 1
                            }
                            var o = new h(e, 0, t, Number.MAX_VALUE),
                                s = this.getFoldsInRange(o).map(function(e) {
                                    return (e = e.clone()).start.row += r, e.end.row += r, e
                                }),
                                a = 0 == n ? this.doc.getLines(e, t) : this.doc.removeFullLines(e, t);
                            return this.doc.insertFullLines(e + r, a), s.length && this.addFolds(s), r
                        }, this.moveLinesUp = function(e, t) {
                            return this.$moveLines(e, t, -1)
                        }, this.moveLinesDown = function(e, t) {
                            return this.$moveLines(e, t, 1)
                        }, this.duplicateLines = function(e, t) {
                            return this.$moveLines(e, t, 0)
                        }, this.$clipRowToDocument = function(e) {
                            return Math.max(0, Math.min(e, this.doc.getLength() - 1))
                        }, this.$clipColumnToRow = function(e, t) {
                            return t < 0 ? 0 : Math.min(this.doc.getLine(e).length, t)
                        }, this.$clipPositionToDocument = function(e, t) {
                            if (t = Math.max(0, t), e < 0) e = 0, t = 0;
                            else {
                                var n = this.doc.getLength();
                                e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
                            }
                            return {
                                row: e,
                                column: t
                            }
                        }, this.$clipRangeToDocument = function(e) {
                            e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
                            var t = this.doc.getLength() - 1;
                            return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
                        }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
                            min: null,
                            max: null
                        }, this.setUseWrapMode = function(e) {
                            if (e != this.$useWrapMode) {
                                if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                                    var t = this.getLength();
                                    this.$wrapData = Array(t), this.$updateWrapData(0, t - 1)
                                }
                                this._signal("changeWrapMode")
                            }
                        }, this.getUseWrapMode = function() {
                            return this.$useWrapMode
                        }, this.setWrapLimitRange = function(e, t) {
                            this.$wrapLimitRange.min === e && this.$wrapLimitRange.max === t || (this.$wrapLimitRange = {
                                min: e,
                                max: t
                            }, this.$modified = !0, this.$bidiHandler.markAsDirty(), this.$useWrapMode && this._signal("changeWrapMode"))
                        }, this.adjustWrapLimit = function(e, t) {
                            var n = this.$wrapLimitRange;
                            n.max < 0 && (n = {
                                min: t,
                                max: t
                            });
                            var r = this.$constrainWrapLimit(e, n.min, n.max);
                            return r != this.$wrapLimit && r > 1 && (this.$wrapLimit = r, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0)
                        }, this.$constrainWrapLimit = function(e, t, n) {
                            return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e
                        }, this.getWrapLimit = function() {
                            return this.$wrapLimit
                        }, this.setWrapLimit = function(e) {
                            this.setWrapLimitRange(e, e)
                        }, this.getWrapLimitRange = function() {
                            return {
                                min: this.$wrapLimitRange.min,
                                max: this.$wrapLimitRange.max
                            }
                        }, this.$updateInternalDataOnChange = function(e) {
                            var t = this.$useWrapMode,
                                n = e.action,
                                r = e.start,
                                i = e.end,
                                o = r.row,
                                s = i.row,
                                a = s - o,
                                l = null;
                            if (this.$updating = !0, 0 != a)
                                if ("remove" === n) {
                                    this[t ? "$wrapData" : "$rowLengthCache"].splice(o, a);
                                    var c = this.$foldData;
                                    l = this.getFoldsInRange(e), this.removeFolds(l);
                                    var u = 0;
                                    if (g = this.getFoldLine(i.row)) {
                                        g.addRemoveChars(i.row, i.column, r.column - i.column), g.shiftRow(-a);
                                        var h = this.getFoldLine(o);
                                        h && h !== g && (h.merge(g), g = h), u = c.indexOf(g) + 1
                                    }
                                    for (; u < c.length; u++) {
                                        (g = c[u]).start.row >= i.row && g.shiftRow(-a)
                                    }
                                    s = o
                                } else {
                                    var d = Array(a);
                                    d.unshift(o, 0);
                                    var f = t ? this.$wrapData : this.$rowLengthCache;
                                    f.splice.apply(f, d);
                                    c = this.$foldData, u = 0;
                                    if (g = this.getFoldLine(o)) {
                                        var p = g.range.compareInside(r.row, r.column);
                                        0 == p ? (g = g.split(r.row, r.column)) && (g.shiftRow(a), g.addRemoveChars(s, 0, i.column - r.column)) : -1 == p && (g.addRemoveChars(o, 0, i.column - r.column), g.shiftRow(a)), u = c.indexOf(g) + 1
                                    }
                                    for (; u < c.length; u++) {
                                        var g;
                                        (g = c[u]).start.row >= o && g.shiftRow(a)
                                    }
                                } else a = Math.abs(e.start.column - e.end.column), "remove" === n && (l = this.getFoldsInRange(e), this.removeFolds(l), a = -a), (g = this.getFoldLine(o)) && g.addRemoveChars(o, r.column, a);
                            return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(o, s) : this.$updateRowLengthCache(o, s), l
                        }, this.$updateRowLengthCache = function(e, t, n) {
                            this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
                        }, this.$updateWrapData = function(n, r) {
                            var i, o, s = this.doc.getAllLines(),
                                a = this.getTabSize(),
                                l = this.$wrapData,
                                c = this.$wrapLimit,
                                u = n;
                            for (r = Math.min(r, s.length - 1); u <= r;)(o = this.getFoldLine(u, o)) ? (i = [], o.walk(function(n, r, o, a) {
                                var l;
                                if (null != n) {
                                    (l = this.$getDisplayTokens(n, i.length))[0] = e;
                                    for (var c = 1; c < l.length; c++) l[c] = t
                                } else l = this.$getDisplayTokens(s[r].substring(a, o), i.length);
                                i = i.concat(l)
                            }.bind(this), o.end.row, s[o.end.row].length + 1), l[o.start.row] = this.$computeWrapSplits(i, c, a), u = o.end.row + 1) : (i = this.$getDisplayTokens(s[u]), l[u] = this.$computeWrapSplits(i, c, a), u++)
                        };
                        var e = 3,
                            t = 4,
                            n = 10,
                            s = 11,
                            c = 12;

                        function d(e) {
                            return !(e < 4352) && (e >= 4352 && e <= 4447 || e >= 4515 && e <= 4519 || e >= 4602 && e <= 4607 || e >= 9001 && e <= 9002 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12283 || e >= 12288 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12589 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12730 || e >= 12736 && e <= 12771 || e >= 12784 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 13054 || e >= 13056 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 55216 && e <= 55238 || e >= 55243 && e <= 55291 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510)
                        }
                        this.$computeWrapSplits = function(r, i, o) {
                            if (0 == r.length) return [];
                            var a = [],
                                l = r.length,
                                u = 0,
                                h = 0,
                                d = this.$wrapAsCode,
                                f = this.$indentedSoftWrap,
                                p = i <= Math.max(2 * o, 8) || !1 === f ? 0 : Math.floor(i / 2);

                            function g(e) {
                                for (var t = e - u, i = u; i < e; i++) {
                                    var l = r[i];
                                    12 !== l && 2 !== l || (t -= 1)
                                }
                                a.length || (m = function() {
                                    var e = 0;
                                    if (0 === p) return e;
                                    if (f)
                                        for (var t = 0; t < r.length; t++) {
                                            var i = r[t];
                                            if (i == n) e += 1;
                                            else {
                                                if (i != s) {
                                                    if (i == c) continue;
                                                    break
                                                }
                                                e += o
                                            }
                                        }
                                    return d && !1 !== f && (e += o), Math.min(e, p)
                                }(), a.indent = m), h += t, a.push(h), u = e
                            }
                            for (var m = 0; l - u > i - m;) {
                                var v = u + i - m;
                                if (r[v - 1] >= n && r[v] >= n) g(v);
                                else if (r[v] != e && r[v] != t) {
                                    for (var y = Math.max(v - (i - (i >> 2)), u - 1); v > y && r[v] < e;) v--;
                                    if (d) {
                                        for (; v > y && r[v] < e;) v--;
                                        for (; v > y && 9 == r[v];) v--
                                    } else
                                        for (; v > y && r[v] < n;) v--;
                                    v > y ? g(++v) : (2 == r[v = u + i] && v--, g(v - m))
                                } else {
                                    for (; v != u - 1 && r[v] != e; v--);
                                    if (v > u) {
                                        g(v);
                                        continue
                                    }
                                    for (v = u + i; v < r.length && r[v] == t; v++);
                                    if (v == r.length) break;
                                    g(v)
                                }
                            }
                            return a
                        }, this.$getDisplayTokens = function(e, t) {
                            var r, i = [];
                            t = t || 0;
                            for (var o = 0; o < e.length; o++) {
                                var a = e.charCodeAt(o);
                                if (9 == a) {
                                    r = this.getScreenTabSize(i.length + t), i.push(s);
                                    for (var l = 1; l < r; l++) i.push(c)
                                } else 32 == a ? i.push(n) : a > 39 && a < 48 || a > 57 && a < 64 ? i.push(9) : a >= 4352 && d(a) ? i.push(1, 2) : i.push(1)
                            }
                            return i
                        }, this.$getStringScreenWidth = function(e, t, n) {
                            if (0 == t) return [0, 0];
                            var r, i;
                            for (null == t && (t = 1 / 0), n = n || 0, i = 0; i < e.length && (9 == (r = e.charCodeAt(i)) ? n += this.getScreenTabSize(n) : r >= 4352 && d(r) ? n += 2 : n += 1, !(n > t)); i++);
                            return [n, i]
                        }, this.lineWidgets = null, this.getRowLength = function(e) {
                            if (this.lineWidgets) var t = this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0;
                            else t = 0;
                            return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
                        }, this.getRowLineCount = function(e) {
                            return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1
                        }, this.getRowWrapIndent = function(e) {
                            if (this.$useWrapMode) {
                                var t = this.screenToDocumentPosition(e, Number.MAX_VALUE),
                                    n = this.$wrapData[t.row];
                                return n.length && n[0] < t.column ? n.indent : 0
                            }
                            return 0
                        }, this.getScreenLastRowColumn = function(e) {
                            var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
                            return this.documentToScreenColumn(t.row, t.column)
                        }, this.getDocumentLastRowColumn = function(e, t) {
                            var n = this.documentToScreenRow(e, t);
                            return this.getScreenLastRowColumn(n)
                        }, this.getDocumentLastRowColumnPosition = function(e, t) {
                            var n = this.documentToScreenRow(e, t);
                            return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10)
                        }, this.getRowSplitData = function(e) {
                            return this.$useWrapMode ? this.$wrapData[e] : void 0
                        }, this.getScreenTabSize = function(e) {
                            return this.$tabSize - (e % this.$tabSize | 0)
                        }, this.screenToDocumentRow = function(e, t) {
                            return this.screenToDocumentPosition(e, t).row
                        }, this.screenToDocumentColumn = function(e, t) {
                            return this.screenToDocumentPosition(e, t).column
                        }, this.screenToDocumentPosition = function(e, t, n) {
                            if (e < 0) return {
                                row: 0,
                                column: 0
                            };
                            var r, i, o = 0,
                                s = 0,
                                a = 0,
                                l = 0,
                                c = this.$screenRowCache,
                                u = this.$getRowCacheIndex(c, e),
                                h = c.length;
                            if (h && u >= 0) {
                                a = c[u], o = this.$docRowCache[u];
                                var d = e > c[h - 1]
                            } else d = !h;
                            for (var f = this.getLength() - 1, p = this.getNextFoldLine(o), g = p ? p.start.row : 1 / 0; a <= e && !(a + (l = this.getRowLength(o)) > e || o >= f);) a += l, ++o > g && (o = p.end.row + 1, g = (p = this.getNextFoldLine(o, p)) ? p.start.row : 1 / 0), d && (this.$docRowCache.push(o), this.$screenRowCache.push(a));
                            if (p && p.start.row <= o) r = this.getFoldDisplayLine(p), o = p.start.row;
                            else {
                                if (a + l <= e || o > f) return {
                                    row: f,
                                    column: this.getLine(f).length
                                };
                                r = this.getLine(o), p = null
                            }
                            var m = 0,
                                v = Math.floor(e - a);
                            if (this.$useWrapMode) {
                                var y = this.$wrapData[o];
                                y && (i = y[v], v > 0 && y.length && (m = y.indent, s = y[v - 1] || y[y.length - 1], r = r.substring(s)))
                            }
                            return void 0 !== n && this.$bidiHandler.isBidiRow(a + v, o, v) && (t = this.$bidiHandler.offsetToCol(n)), s += this.$getStringScreenWidth(r, t - m)[1], this.$useWrapMode && s >= i && (s = i - 1), p ? p.idxToPosition(s) : {
                                row: o,
                                column: s
                            }
                        }, this.documentToScreenPosition = function(e, t) {
                            if (void 0 === t) var n = this.$clipPositionToDocument(e.row, e.column);
                            else n = this.$clipPositionToDocument(e, t);
                            e = n.row, t = n.column;
                            var r, i = 0,
                                o = null;
                            (r = this.getFoldAt(e, t, 1)) && (e = r.start.row, t = r.start.column);
                            var s, a = 0,
                                l = this.$docRowCache,
                                c = this.$getRowCacheIndex(l, e),
                                u = l.length;
                            if (u && c >= 0) {
                                a = l[c], i = this.$screenRowCache[c];
                                var h = e > l[u - 1]
                            } else h = !u;
                            for (var d = this.getNextFoldLine(a), f = d ? d.start.row : 1 / 0; a < e;) {
                                if (a >= f) {
                                    if ((s = d.end.row + 1) > e) break;
                                    f = (d = this.getNextFoldLine(s, d)) ? d.start.row : 1 / 0
                                } else s = a + 1;
                                i += this.getRowLength(a), a = s, h && (this.$docRowCache.push(a), this.$screenRowCache.push(i))
                            }
                            var p = "";
                            d && a >= f ? (p = this.getFoldDisplayLine(d, e, t), o = d.start.row) : (p = this.getLine(e).substring(0, t), o = e);
                            var g = 0;
                            if (this.$useWrapMode) {
                                var m = this.$wrapData[o];
                                if (m) {
                                    for (var v = 0; p.length >= m[v];) i++, v++;
                                    p = p.substring(m[v - 1] || 0, p.length), g = v > 0 ? m.indent : 0
                                }
                            }
                            return {
                                row: i,
                                column: g + this.$getStringScreenWidth(p)[0]
                            }
                        }, this.documentToScreenColumn = function(e, t) {
                            return this.documentToScreenPosition(e, t).column
                        }, this.documentToScreenRow = function(e, t) {
                            return this.documentToScreenPosition(e, t).row
                        }, this.getScreenLength = function() {
                            var e = 0,
                                t = null;
                            if (this.$useWrapMode)
                                for (var n = this.$wrapData.length, r = 0, i = (a = 0, (t = this.$foldData[a++]) ? t.start.row : 1 / 0); r < n;) {
                                    var o = this.$wrapData[r];
                                    e += o ? o.length + 1 : 1, ++r > i && (r = t.end.row + 1, i = (t = this.$foldData[a++]) ? t.start.row : 1 / 0)
                                } else {
                                e = this.getLength();
                                for (var s = this.$foldData, a = 0; a < s.length; a++) e -= (t = s[a]).end.row - t.start.row
                            }
                            return this.lineWidgets && (e += this.$getWidgetScreenLength()), e
                        }, this.$setFontMetrics = function(e) {
                            this.$enableVarChar && (this.$getStringScreenWidth = function(t, n, r) {
                                if (0 === n) return [0, 0];
                                var i, o;
                                for (n || (n = 1 / 0), r = r || 0, o = 0; o < t.length && !((r += "\t" === (i = t.charAt(o)) ? this.getScreenTabSize(r) : e.getCharacterWidth(i)) > n); o++);
                                return [r, o]
                            })
                        }, this.destroy = function() {
                            this.bgTokenizer && (this.bgTokenizer.setDocument(null), this.bgTokenizer = null), this.$stopWorker()
                        }, this.isFullWidth = d
                    }.call(g.prototype), e("./edit_session/folding").Folding.call(g.prototype), e("./edit_session/bracket_match").BracketMatch.call(g.prototype), a.defineOptions(g.prototype, "session", {
                    wrap: {
                        set: function(e) {
                            if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e)
                                if (this.$wrap = e, e) {
                                    var t = "number" == typeof e ? e : null;
                                    this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
                                } else this.setUseWrapMode(!1)
                        },
                        get: function() {
                            return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off"
                        },
                        handlesSet: !0
                    },
                    wrapMethod: {
                        set: function(e) {
                            (e = "auto" == e ? "text" != this.$mode.type : "text" != e) != this.$wrapAsCode && (this.$wrapAsCode = e, this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0)))
                        },
                        initialValue: "auto"
                    },
                    indentedSoftWrap: {
                        set: function() {
                            this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0))
                        },
                        initialValue: !0
                    },
                    firstLineNumber: {
                        set: function() {
                            this._signal("changeBreakpoint")
                        },
                        initialValue: 1
                    },
                    useWorker: {
                        set: function(e) {
                            this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
                        },
                        initialValue: !0
                    },
                    useSoftTabs: {
                        initialValue: !0
                    },
                    tabSize: {
                        set: function(e) {
                            (e = parseInt(e)) > 0 && this.$tabSize !== e && (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._signal("changeTabSize"))
                        },
                        initialValue: 4,
                        handlesSet: !0
                    },
                    navigateWithinSoftTabs: {
                        initialValue: !1
                    },
                    foldStyle: {
                        set: function(e) {
                            this.setFoldStyle(e)
                        },
                        handlesSet: !0
                    },
                    overwrite: {
                        set: function(e) {
                            this._signal("changeOverwrite")
                        },
                        initialValue: !1
                    },
                    newLineMode: {
                        set: function(e) {
                            this.doc.setNewLineMode(e)
                        },
                        get: function() {
                            return this.doc.getNewLineMode()
                        },
                        handlesSet: !0
                    },
                    mode: {
                        set: function(e) {
                            this.setMode(e)
                        },
                        get: function() {
                            return this.$modeId
                        },
                        handlesSet: !0
                    }
                }), t.EditSession = g
            }), ace.define("ace/search", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/lang"),
                    i = e("./lib/oop"),
                    o = e("./range").Range,
                    s = function() {
                        this.$options = {}
                    };
                (function() {
                    this.set = function(e) {
                        return i.mixin(this.$options, e), this
                    }, this.getOptions = function() {
                        return r.copyObject(this.$options)
                    }, this.setOptions = function(e) {
                        this.$options = e
                    }, this.find = function(e) {
                        var t = this.$options,
                            n = this.$matchIterator(e, t);
                        if (!n) return !1;
                        var r = null;
                        return n.forEach(function(e, n, i, s) {
                            return r = new o(e, n, i, s), !(n == s && t.start && t.start.start && 0 != t.skipCurrent && r.isEqual(t.start)) || (r = null, !1)
                        }), r
                    }, this.findAll = function(e) {
                        var t = this.$options;
                        if (!t.needle) return [];
                        this.$assembleRegExp(t);
                        var n = t.range,
                            i = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(),
                            s = [],
                            a = t.re;
                        if (t.$isMultiLine) {
                            var l, c = a.length,
                                u = i.length - c;
                            e: for (var h = a.offset || 0; h <= u; h++) {
                                for (var d = 0; d < c; d++)
                                    if (-1 == i[h + d].search(a[d])) continue e;
                                var f = i[h],
                                    p = i[h + c - 1],
                                    g = f.length - f.match(a[0])[0].length,
                                    m = p.match(a[c - 1])[0].length;
                                l && l.end.row === h && l.end.column > g || (s.push(l = new o(h, g, h + c - 1, m)), c > 2 && (h = h + c - 2))
                            }
                        } else
                            for (var v = 0; v < i.length; v++) {
                                var y = r.getMatchOffsets(i[v], a);
                                for (d = 0; d < y.length; d++) {
                                    var b = y[d];
                                    s.push(new o(v, b.offset, v, b.offset + b.length))
                                }
                            }
                        if (n) {
                            var w = n.start.column,
                                _ = n.start.column;
                            for (v = 0, d = s.length - 1; v < d && s[v].start.column < w && s[v].start.row == n.start.row;) v++;
                            for (; v < d && s[d].end.column > _ && s[d].end.row == n.end.row;) d--;
                            for (s = s.slice(v, d + 1), v = 0, d = s.length; v < d; v++) s[v].start.row += n.start.row, s[v].end.row += n.start.row
                        }
                        return s
                    }, this.replace = function(e, t) {
                        var n = this.$options,
                            r = this.$assembleRegExp(n);
                        if (n.$isMultiLine) return t;
                        if (r) {
                            var i = r.exec(e);
                            if (!i || i[0].length != e.length) return null;
                            if (t = e.replace(r, t), n.preserveCase) {
                                t = t.split("");
                                for (var o = Math.min(e.length, e.length); o--;) {
                                    var s = e[o];
                                    s && s.toLowerCase() != s ? t[o] = t[o].toUpperCase() : t[o] = t[o].toLowerCase()
                                }
                                t = t.join("")
                            }
                            return t
                        }
                    }, this.$assembleRegExp = function(e, t) {
                        if (e.needle instanceof RegExp) return e.re = e.needle;
                        var n = e.needle;
                        if (!e.needle) return e.re = !1;
                        e.regExp || (n = r.escapeRegExp(n)), e.wholeWord && (n = function(e, t) {
                            function n(e) {
                                return /\w/.test(e) || t.regExp ? "\\b" : ""
                            }
                            return n(e[0]) + e + n(e[e.length - 1])
                        }(n, e));
                        var i = e.caseSensitive ? "gm" : "gmi";
                        if (e.$isMultiLine = !t && /[\n\r]/.test(n), e.$isMultiLine) return e.re = this.$assembleMultilineRegExp(n, i);
                        try {
                            var o = new RegExp(n, i)
                        } catch (e) {
                            o = !1
                        }
                        return e.re = o
                    }, this.$assembleMultilineRegExp = function(e, t) {
                        for (var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), r = [], i = 0; i < n.length; i++) try {
                            r.push(new RegExp(n[i], t))
                        } catch (e) {
                            return !1
                        }
                        return r
                    }, this.$matchIterator = function(e, t) {
                        var n = this.$assembleRegExp(t);
                        if (!n) return !1;
                        var r = 1 == t.backwards,
                            i = 0 != t.skipCurrent,
                            o = t.range,
                            s = t.start;
                        s || (s = o ? o[r ? "end" : "start"] : e.selection.getRange()), s.start && (s = s[i != r ? "end" : "start"]);
                        var a = o ? o.start.row : 0,
                            l = o ? o.end.row : e.getLength() - 1;
                        if (r) var c = function(e) {
                            var n = s.row;
                            if (!h(n, s.column, e)) {
                                for (n--; n >= a; n--)
                                    if (h(n, Number.MAX_VALUE, e)) return;
                                if (0 != t.wrap)
                                    for (n = l, a = s.row; n >= a; n--)
                                        if (h(n, Number.MAX_VALUE, e)) return
                            }
                        };
                        else c = function(e) {
                            var n = s.row;
                            if (!h(n, s.column, e)) {
                                for (n += 1; n <= l; n++)
                                    if (h(n, 0, e)) return;
                                if (0 != t.wrap)
                                    for (n = a, l = s.row; n <= l; n++)
                                        if (h(n, 0, e)) return
                            }
                        };
                        if (t.$isMultiLine) var u = n.length,
                            h = function(t, i, o) {
                                var s = r ? t - u + 1 : t;
                                if (!(s < 0)) {
                                    var a = e.getLine(s),
                                        l = a.search(n[0]);
                                    if (!(!r && l < i || -1 === l)) {
                                        for (var c = 1; c < u; c++)
                                            if (-1 == (a = e.getLine(s + c)).search(n[c])) return;
                                        var h = a.match(n[u - 1])[0].length;
                                        if (!(r && h > i)) return !!o(s, l, s + u - 1, h) || void 0
                                    }
                                }
                            };
                        else if (r) h = function(t, r, i) {
                            var o, s = e.getLine(t),
                                a = [],
                                l = 0;
                            for (n.lastIndex = 0; o = n.exec(s);) {
                                var c = o[0].length;
                                if (l = o.index, !c) {
                                    if (l >= s.length) break;
                                    n.lastIndex = l += 1
                                }
                                if (o.index + c > r) break;
                                a.push(o.index, c)
                            }
                            for (var u = a.length - 1; u >= 0; u -= 2) {
                                var h = a[u - 1];
                                if (i(t, h, t, h + (c = a[u]))) return !0
                            }
                        };
                        else h = function(t, r, i) {
                                var o, s, a = e.getLine(t);
                                for (n.lastIndex = r; s = n.exec(a);) {
                                    var l = s[0].length;
                                    if (i(t, o = s.index, t, o + l)) return !0;
                                    if (!l && (n.lastIndex = o += 1, o >= a.length)) return !1
                                }
                            };
                        return {
                            forEach: c
                        }
                    }
                }).call(s.prototype), t.Search = s
            }), ace.define("ace/keyboard/hash_handler", [], function(e, t, n) {
                "use strict";
                var i = e("../lib/keys"),
                    o = e("../lib/useragent"),
                    s = i.KEY_MODS;

                function a(e, t) {
                    this.platform = t || (o.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e), this.$singleCommand = !0
                }

                function l(e, t) {
                    a.call(this, e, t), this.$singleCommand = !1
                }
                l.prototype = a.prototype,
                    function() {
                        function e(e) {
                            return "object" == r(e) && e.bindKey && e.bindKey.position || (e.isDefault ? -100 : 0)
                        }
                        this.addCommand = function(e) {
                            this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
                        }, this.removeCommand = function(e, t) {
                            var n = e && ("string" == typeof e ? e : e.name);
                            e = this.commands[n], t || delete this.commands[n];
                            var r = this.commandKeyBinding;
                            for (var i in r) {
                                var o = r[i];
                                if (o == e) delete r[i];
                                else if (Array.isArray(o)) {
                                    var s = o.indexOf(e); - 1 != s && (o.splice(s, 1), 1 == o.length && (r[i] = o[0]))
                                }
                            }
                        }, this.bindKey = function(e, t, n) {
                            if ("object" == r(e) && e && (null == n && (n = e.position), e = e[this.platform]), e) return "function" == typeof t ? this.addCommand({
                                exec: t,
                                bindKey: e,
                                name: t.name || e
                            }) : void e.split("|").forEach(function(e) {
                                var r = "";
                                if (-1 != e.indexOf(" ")) {
                                    var i = e.split(/\s+/);
                                    e = i.pop(), i.forEach(function(e) {
                                        var t = this.parseKeys(e),
                                            n = s[t.hashId] + t.key;
                                        r += (r ? " " : "") + n, this._addCommandToBinding(r, "chainKeys")
                                    }, this), r += " "
                                }
                                var o = this.parseKeys(e),
                                    a = s[o.hashId] + o.key;
                                this._addCommandToBinding(r + a, t, n)
                            }, this)
                        }, this._addCommandToBinding = function(t, n, r) {
                            var i, o = this.commandKeyBinding;
                            if (n)
                                if (!o[t] || this.$singleCommand) o[t] = n;
                                else {
                                    Array.isArray(o[t]) ? -1 != (i = o[t].indexOf(n)) && o[t].splice(i, 1) : o[t] = [o[t]], "number" != typeof r && (r = e(n));
                                    var s = o[t];
                                    for (i = 0; i < s.length; i++) {
                                        if (e(s[i]) > r) break
                                    }
                                    s.splice(i, 0, n)
                                } else delete o[t]
                        }, this.addCommands = function(e) {
                            e && Object.keys(e).forEach(function(t) {
                                var n = e[t];
                                if (n) {
                                    if ("string" == typeof n) return this.bindKey(n, t);
                                    "function" == typeof n && (n = {
                                        exec: n
                                    }), "object" === r(n) && (n.name || (n.name = t), this.addCommand(n))
                                }
                            }, this)
                        }, this.removeCommands = function(e) {
                            Object.keys(e).forEach(function(t) {
                                this.removeCommand(e[t])
                            }, this)
                        }, this.bindKeys = function(e) {
                            Object.keys(e).forEach(function(t) {
                                this.bindKey(t, e[t])
                            }, this)
                        }, this._buildKeyHash = function(e) {
                            this.bindKey(e.bindKey, e)
                        }, this.parseKeys = function(e) {
                            var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e) {
                                    return e
                                }),
                                n = t.pop(),
                                r = i[n];
                            if (i.FUNCTION_KEYS[r]) n = i.FUNCTION_KEYS[r].toLowerCase();
                            else {
                                if (!t.length) return {
                                    key: n,
                                    hashId: -1
                                };
                                if (1 == t.length && "shift" == t[0]) return {
                                    key: n.toUpperCase(),
                                    hashId: -1
                                }
                            }
                            for (var o = 0, s = t.length; s--;) {
                                var a = i.KEY_MODS[t[s]];
                                if (null == a) return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
                                o |= a
                            }
                            return {
                                key: n,
                                hashId: o
                            }
                        }, this.findKeyCommand = function(e, t) {
                            var n = s[e] + t;
                            return this.commandKeyBinding[n]
                        }, this.handleKeyboard = function(e, t, n, r) {
                            if (!(r < 0)) {
                                var i = s[t] + n,
                                    o = this.commandKeyBinding[i];
                                return e.$keyChain && (e.$keyChain += " " + i, o = this.commandKeyBinding[e.$keyChain] || o), !o || "chainKeys" != o && "chainKeys" != o[o.length - 1] ? (e.$keyChain && (t && 4 != t || 1 != n.length ? (-1 == t || r > 0) && (e.$keyChain = "") : e.$keyChain = e.$keyChain.slice(0, -i.length - 1)), {
                                    command: o
                                }) : (e.$keyChain = e.$keyChain || i, {
                                    command: "null"
                                })
                            }
                        }, this.getStatusText = function(e, t) {
                            return t.$keyChain || ""
                        }
                    }.call(a.prototype), t.HashHandler = a, t.MultiHashHandler = l
            }), ace.define("ace/commands/command_manager", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/oop"),
                    i = e("../keyboard/hash_handler").MultiHashHandler,
                    o = e("../lib/event_emitter").EventEmitter,
                    s = function(e, t) {
                        i.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function(e) {
                            return e.command.exec(e.editor, e.args || {})
                        })
                    };
                r.inherits(s, i),
                    function() {
                        r.implement(this, o), this.exec = function(e, t, n) {
                            if (Array.isArray(e)) {
                                for (var r = e.length; r--;)
                                    if (this.exec(e[r], t, n)) return !0;
                                return !1
                            }
                            if ("string" == typeof e && (e = this.commands[e]), !e) return !1;
                            if (t && t.$readOnly && !e.readOnly) return !1;
                            if (0 != this.$checkCommandState && e.isAvailable && !e.isAvailable(t)) return !1;
                            var i = {
                                editor: t,
                                command: e,
                                args: n
                            };
                            return i.returnValue = this._emit("exec", i), this._signal("afterExec", i), !1 !== i.returnValue
                        }, this.toggleRecording = function(e) {
                            if (!this.$inReplay) return e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(e) {
                                this.macro.push([e.command, e.args])
                            }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0)
                        }, this.replay = function(e) {
                            if (!this.$inReplay && this.macro) {
                                if (this.recording) return this.toggleRecording(e);
                                try {
                                    this.$inReplay = !0, this.macro.forEach(function(t) {
                                        "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1])
                                    }, this)
                                } finally {
                                    this.$inReplay = !1
                                }
                            }
                        }, this.trimMacro = function(e) {
                            return e.map(function(e) {
                                return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e
                            })
                        }
                    }.call(s.prototype), t.CommandManager = s
            }), ace.define("ace/commands/default_commands", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/lang"),
                    i = e("../config"),
                    o = e("../range").Range;

                function s(e, t) {
                    return {
                        win: e,
                        mac: t
                    }
                }
                t.commands = [{
                    name: "showSettingsMenu",
                    bindKey: s("Ctrl-,", "Command-,"),
                    exec: function(e) {
                        i.loadModule("ace/ext/settings_menu", function(t) {
                            t.init(e), e.showSettingsMenu()
                        })
                    },
                    readOnly: !0
                }, {
                    name: "goToNextError",
                    bindKey: s("Alt-E", "F4"),
                    exec: function(e) {
                        i.loadModule("./ext/error_marker", function(t) {
                            t.showErrorMarker(e, 1)
                        })
                    },
                    scrollIntoView: "animate",
                    readOnly: !0
                }, {
                    name: "goToPreviousError",
                    bindKey: s("Alt-Shift-E", "Shift-F4"),
                    exec: function(e) {
                        i.loadModule("./ext/error_marker", function(t) {
                            t.showErrorMarker(e, -1)
                        })
                    },
                    scrollIntoView: "animate",
                    readOnly: !0
                }, {
                    name: "selectall",
                    description: "Select all",
                    bindKey: s("Ctrl-A", "Command-A"),
                    exec: function(e) {
                        e.selectAll()
                    },
                    readOnly: !0
                }, {
                    name: "centerselection",
                    description: "Center selection",
                    bindKey: s(null, "Ctrl-L"),
                    exec: function(e) {
                        e.centerSelection()
                    },
                    readOnly: !0
                }, {
                    name: "gotoline",
                    description: "Go to line...",
                    bindKey: s("Ctrl-L", "Command-L"),
                    exec: function(e, t) {
                        "number" != typeof t || isNaN(t) || e.gotoLine(t), e.prompt({
                            $type: "gotoLine"
                        })
                    },
                    readOnly: !0
                }, {
                    name: "fold",
                    bindKey: s("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
                    exec: function(e) {
                        e.session.toggleFold(!1)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "unfold",
                    bindKey: s("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
                    exec: function(e) {
                        e.session.toggleFold(!0)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "toggleFoldWidget",
                    bindKey: s("F2", "F2"),
                    exec: function(e) {
                        e.session.toggleFoldWidget()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "toggleParentFoldWidget",
                    bindKey: s("Alt-F2", "Alt-F2"),
                    exec: function(e) {
                        e.session.toggleFoldWidget(!0)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "foldall",
                    description: "Fold all",
                    bindKey: s(null, "Ctrl-Command-Option-0"),
                    exec: function(e) {
                        e.session.foldAll()
                    },
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "foldOther",
                    description: "Fold other",
                    bindKey: s("Alt-0", "Command-Option-0"),
                    exec: function(e) {
                        e.session.foldAll(), e.session.unfold(e.selection.getAllRanges())
                    },
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "unfoldall",
                    description: "Unfold all",
                    bindKey: s("Alt-Shift-0", "Command-Option-Shift-0"),
                    exec: function(e) {
                        e.session.unfold()
                    },
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "findnext",
                    description: "Find next",
                    bindKey: s("Ctrl-K", "Command-G"),
                    exec: function(e) {
                        e.findNext()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "findprevious",
                    description: "Find previous",
                    bindKey: s("Ctrl-Shift-K", "Command-Shift-G"),
                    exec: function(e) {
                        e.findPrevious()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "center",
                    readOnly: !0
                }, {
                    name: "selectOrFindNext",
                    description: "Select or find next",
                    bindKey: s("Alt-K", "Ctrl-G"),
                    exec: function(e) {
                        e.selection.isEmpty() ? e.selection.selectWord() : e.findNext()
                    },
                    readOnly: !0
                }, {
                    name: "selectOrFindPrevious",
                    description: "Select or find previous",
                    bindKey: s("Alt-Shift-K", "Ctrl-Shift-G"),
                    exec: function(e) {
                        e.selection.isEmpty() ? e.selection.selectWord() : e.findPrevious()
                    },
                    readOnly: !0
                }, {
                    name: "find",
                    description: "Find",
                    bindKey: s("Ctrl-F", "Command-F"),
                    exec: function(e) {
                        i.loadModule("ace/ext/searchbox", function(t) {
                            t.Search(e)
                        })
                    },
                    readOnly: !0
                }, {
                    name: "overwrite",
                    description: "Overwrite",
                    bindKey: "Insert",
                    exec: function(e) {
                        e.toggleOverwrite()
                    },
                    readOnly: !0
                }, {
                    name: "selecttostart",
                    description: "Select to start",
                    bindKey: s("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"),
                    exec: function(e) {
                        e.getSelection().selectFileStart()
                    },
                    multiSelectAction: "forEach",
                    readOnly: !0,
                    scrollIntoView: "animate",
                    aceCommandGroup: "fileJump"
                }, {
                    name: "gotostart",
                    description: "Go to start",
                    bindKey: s("Ctrl-Home", "Command-Home|Command-Up"),
                    exec: function(e) {
                        e.navigateFileStart()
                    },
                    multiSelectAction: "forEach",
                    readOnly: !0,
                    scrollIntoView: "animate",
                    aceCommandGroup: "fileJump"
                }, {
                    name: "selectup",
                    description: "Select up",
                    bindKey: s("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
                    exec: function(e) {
                        e.getSelection().selectUp()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "golineup",
                    description: "Go line up",
                    bindKey: s("Up", "Up|Ctrl-P"),
                    exec: function(e, t) {
                        e.navigateUp(t.times)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selecttoend",
                    description: "Select to end",
                    bindKey: s("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"),
                    exec: function(e) {
                        e.getSelection().selectFileEnd()
                    },
                    multiSelectAction: "forEach",
                    readOnly: !0,
                    scrollIntoView: "animate",
                    aceCommandGroup: "fileJump"
                }, {
                    name: "gotoend",
                    description: "Go to end",
                    bindKey: s("Ctrl-End", "Command-End|Command-Down"),
                    exec: function(e) {
                        e.navigateFileEnd()
                    },
                    multiSelectAction: "forEach",
                    readOnly: !0,
                    scrollIntoView: "animate",
                    aceCommandGroup: "fileJump"
                }, {
                    name: "selectdown",
                    description: "Select down",
                    bindKey: s("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
                    exec: function(e) {
                        e.getSelection().selectDown()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "golinedown",
                    description: "Go line down",
                    bindKey: s("Down", "Down|Ctrl-N"),
                    exec: function(e, t) {
                        e.navigateDown(t.times)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectwordleft",
                    description: "Select word left",
                    bindKey: s("Ctrl-Shift-Left", "Option-Shift-Left"),
                    exec: function(e) {
                        e.getSelection().selectWordLeft()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotowordleft",
                    description: "Go to word left",
                    bindKey: s("Ctrl-Left", "Option-Left"),
                    exec: function(e) {
                        e.navigateWordLeft()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selecttolinestart",
                    description: "Select to line start",
                    bindKey: s("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
                    exec: function(e) {
                        e.getSelection().selectLineStart()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotolinestart",
                    description: "Go to line start",
                    bindKey: s("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
                    exec: function(e) {
                        e.navigateLineStart()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectleft",
                    description: "Select left",
                    bindKey: s("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
                    exec: function(e) {
                        e.getSelection().selectLeft()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotoleft",
                    description: "Go to left",
                    bindKey: s("Left", "Left|Ctrl-B"),
                    exec: function(e, t) {
                        e.navigateLeft(t.times)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectwordright",
                    description: "Select word right",
                    bindKey: s("Ctrl-Shift-Right", "Option-Shift-Right"),
                    exec: function(e) {
                        e.getSelection().selectWordRight()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotowordright",
                    description: "Go to word right",
                    bindKey: s("Ctrl-Right", "Option-Right"),
                    exec: function(e) {
                        e.navigateWordRight()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selecttolineend",
                    description: "Select to line end",
                    bindKey: s("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"),
                    exec: function(e) {
                        e.getSelection().selectLineEnd()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotolineend",
                    description: "Go to line end",
                    bindKey: s("Alt-Right|End", "Command-Right|End|Ctrl-E"),
                    exec: function(e) {
                        e.navigateLineEnd()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectright",
                    description: "Select right",
                    bindKey: s("Shift-Right", "Shift-Right"),
                    exec: function(e) {
                        e.getSelection().selectRight()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "gotoright",
                    description: "Go to right",
                    bindKey: s("Right", "Right|Ctrl-F"),
                    exec: function(e, t) {
                        e.navigateRight(t.times)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectpagedown",
                    description: "Select page down",
                    bindKey: "Shift-PageDown",
                    exec: function(e) {
                        e.selectPageDown()
                    },
                    readOnly: !0
                }, {
                    name: "pagedown",
                    description: "Page down",
                    bindKey: s(null, "Option-PageDown"),
                    exec: function(e) {
                        e.scrollPageDown()
                    },
                    readOnly: !0
                }, {
                    name: "gotopagedown",
                    description: "Go to page down",
                    bindKey: s("PageDown", "PageDown|Ctrl-V"),
                    exec: function(e) {
                        e.gotoPageDown()
                    },
                    readOnly: !0
                }, {
                    name: "selectpageup",
                    description: "Select page up",
                    bindKey: "Shift-PageUp",
                    exec: function(e) {
                        e.selectPageUp()
                    },
                    readOnly: !0
                }, {
                    name: "pageup",
                    description: "Page up",
                    bindKey: s(null, "Option-PageUp"),
                    exec: function(e) {
                        e.scrollPageUp()
                    },
                    readOnly: !0
                }, {
                    name: "gotopageup",
                    description: "Go to page up",
                    bindKey: "PageUp",
                    exec: function(e) {
                        e.gotoPageUp()
                    },
                    readOnly: !0
                }, {
                    name: "scrollup",
                    description: "Scroll up",
                    bindKey: s("Ctrl-Up", null),
                    exec: function(e) {
                        e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
                    },
                    readOnly: !0
                }, {
                    name: "scrolldown",
                    description: "Scroll down",
                    bindKey: s("Ctrl-Down", null),
                    exec: function(e) {
                        e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
                    },
                    readOnly: !0
                }, {
                    name: "selectlinestart",
                    description: "Select line start",
                    bindKey: "Shift-Home",
                    exec: function(e) {
                        e.getSelection().selectLineStart()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectlineend",
                    description: "Select line end",
                    bindKey: "Shift-End",
                    exec: function(e) {
                        e.getSelection().selectLineEnd()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "togglerecording",
                    description: "Toggle recording",
                    bindKey: s("Ctrl-Alt-E", "Command-Option-E"),
                    exec: function(e) {
                        e.commands.toggleRecording(e)
                    },
                    readOnly: !0
                }, {
                    name: "replaymacro",
                    description: "Replay macro",
                    bindKey: s("Ctrl-Shift-E", "Command-Shift-E"),
                    exec: function(e) {
                        e.commands.replay(e)
                    },
                    readOnly: !0
                }, {
                    name: "jumptomatching",
                    description: "Jump to matching",
                    bindKey: s("Ctrl-P", "Ctrl-P"),
                    exec: function(e) {
                        e.jumpToMatching()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "animate",
                    readOnly: !0
                }, {
                    name: "selecttomatching",
                    description: "Select to matching",
                    bindKey: s("Ctrl-Shift-P", "Ctrl-Shift-P"),
                    exec: function(e) {
                        e.jumpToMatching(!0)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "animate",
                    readOnly: !0
                }, {
                    name: "expandToMatching",
                    description: "Expand to matching",
                    bindKey: s("Ctrl-Shift-M", "Ctrl-Shift-M"),
                    exec: function(e) {
                        e.jumpToMatching(!0, !0)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "animate",
                    readOnly: !0
                }, {
                    name: "passKeysToBrowser",
                    description: "Pass keys to browser",
                    bindKey: s(null, null),
                    exec: function() {},
                    passEvent: !0,
                    readOnly: !0
                }, {
                    name: "copy",
                    description: "Copy",
                    exec: function(e) {},
                    readOnly: !0
                }, {
                    name: "cut",
                    description: "Cut",
                    exec: function(e) {
                        var t = e.$copyWithEmptySelection && e.selection.isEmpty() ? e.selection.getLineRange() : e.selection.getRange();
                        e._emit("cut", t), t.isEmpty() || e.session.remove(t), e.clearSelection()
                    },
                    scrollIntoView: "cursor",
                    multiSelectAction: "forEach"
                }, {
                    name: "paste",
                    description: "Paste",
                    exec: function(e, t) {
                        e.$handlePaste(t)
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "removeline",
                    description: "Remove line",
                    bindKey: s("Ctrl-D", "Command-D"),
                    exec: function(e) {
                        e.removeLines()
                    },
                    scrollIntoView: "cursor",
                    multiSelectAction: "forEachLine"
                }, {
                    name: "duplicateSelection",
                    description: "Duplicate selection",
                    bindKey: s("Ctrl-Shift-D", "Command-Shift-D"),
                    exec: function(e) {
                        e.duplicateSelection()
                    },
                    scrollIntoView: "cursor",
                    multiSelectAction: "forEach"
                }, {
                    name: "sortlines",
                    description: "Sort lines",
                    bindKey: s("Ctrl-Alt-S", "Command-Alt-S"),
                    exec: function(e) {
                        e.sortLines()
                    },
                    scrollIntoView: "selection",
                    multiSelectAction: "forEachLine"
                }, {
                    name: "togglecomment",
                    description: "Toggle comment",
                    bindKey: s("Ctrl-/", "Command-/"),
                    exec: function(e) {
                        e.toggleCommentLines()
                    },
                    multiSelectAction: "forEachLine",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "toggleBlockComment",
                    description: "Toggle block comment",
                    bindKey: s("Ctrl-Shift-/", "Command-Shift-/"),
                    exec: function(e) {
                        e.toggleBlockComment()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "modifyNumberUp",
                    description: "Modify number up",
                    bindKey: s("Ctrl-Shift-Up", "Alt-Shift-Up"),
                    exec: function(e) {
                        e.modifyNumber(1)
                    },
                    scrollIntoView: "cursor",
                    multiSelectAction: "forEach"
                }, {
                    name: "modifyNumberDown",
                    description: "Modify number down",
                    bindKey: s("Ctrl-Shift-Down", "Alt-Shift-Down"),
                    exec: function(e) {
                        e.modifyNumber(-1)
                    },
                    scrollIntoView: "cursor",
                    multiSelectAction: "forEach"
                }, {
                    name: "replace",
                    description: "Replace",
                    bindKey: s("Ctrl-H", "Command-Option-F"),
                    exec: function(e) {
                        i.loadModule("ace/ext/searchbox", function(t) {
                            t.Search(e, !0)
                        })
                    }
                }, {
                    name: "undo",
                    description: "Undo",
                    bindKey: s("Ctrl-Z", "Command-Z"),
                    exec: function(e) {
                        e.undo()
                    }
                }, {
                    name: "redo",
                    description: "Redo",
                    bindKey: s("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
                    exec: function(e) {
                        e.redo()
                    }
                }, {
                    name: "copylinesup",
                    description: "Copy lines up",
                    bindKey: s("Alt-Shift-Up", "Command-Option-Up"),
                    exec: function(e) {
                        e.copyLinesUp()
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "movelinesup",
                    description: "Move lines up",
                    bindKey: s("Alt-Up", "Option-Up"),
                    exec: function(e) {
                        e.moveLinesUp()
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "copylinesdown",
                    description: "Copy lines down",
                    bindKey: s("Alt-Shift-Down", "Command-Option-Down"),
                    exec: function(e) {
                        e.copyLinesDown()
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "movelinesdown",
                    description: "Move lines down",
                    bindKey: s("Alt-Down", "Option-Down"),
                    exec: function(e) {
                        e.moveLinesDown()
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "del",
                    description: "Delete",
                    bindKey: s("Delete", "Delete|Ctrl-D|Shift-Delete"),
                    exec: function(e) {
                        e.remove("right")
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "backspace",
                    description: "Backspace",
                    bindKey: s("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
                    exec: function(e) {
                        e.remove("left")
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "cut_or_delete",
                    description: "Cut or delete",
                    bindKey: s("Shift-Delete", null),
                    exec: function(e) {
                        if (!e.selection.isEmpty()) return !1;
                        e.remove("left")
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removetolinestart",
                    description: "Remove to line start",
                    bindKey: s("Alt-Backspace", "Command-Backspace"),
                    exec: function(e) {
                        e.removeToLineStart()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removetolineend",
                    description: "Remove to line end",
                    bindKey: s("Alt-Delete", "Ctrl-K|Command-Delete"),
                    exec: function(e) {
                        e.removeToLineEnd()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removetolinestarthard",
                    description: "Remove to line start hard",
                    bindKey: s("Ctrl-Shift-Backspace", null),
                    exec: function(e) {
                        var t = e.selection.getRange();
                        t.start.column = 0, e.session.remove(t)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removetolineendhard",
                    description: "Remove to line end hard",
                    bindKey: s("Ctrl-Shift-Delete", null),
                    exec: function(e) {
                        var t = e.selection.getRange();
                        t.end.column = Number.MAX_VALUE, e.session.remove(t)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removewordleft",
                    description: "Remove word left",
                    bindKey: s("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
                    exec: function(e) {
                        e.removeWordLeft()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "removewordright",
                    description: "Remove word right",
                    bindKey: s("Ctrl-Delete", "Alt-Delete"),
                    exec: function(e) {
                        e.removeWordRight()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "outdent",
                    description: "Outdent",
                    bindKey: s("Shift-Tab", "Shift-Tab"),
                    exec: function(e) {
                        e.blockOutdent()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "indent",
                    description: "Indent",
                    bindKey: s("Tab", "Tab"),
                    exec: function(e) {
                        e.indent()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "blockoutdent",
                    description: "Block outdent",
                    bindKey: s("Ctrl-[", "Ctrl-["),
                    exec: function(e) {
                        e.blockOutdent()
                    },
                    multiSelectAction: "forEachLine",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "blockindent",
                    description: "Block indent",
                    bindKey: s("Ctrl-]", "Ctrl-]"),
                    exec: function(e) {
                        e.blockIndent()
                    },
                    multiSelectAction: "forEachLine",
                    scrollIntoView: "selectionPart"
                }, {
                    name: "insertstring",
                    description: "Insert string",
                    exec: function(e, t) {
                        e.insert(t)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "inserttext",
                    description: "Insert text",
                    exec: function(e, t) {
                        e.insert(r.stringRepeat(t.text || "", t.times || 1))
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "splitline",
                    description: "Split line",
                    bindKey: s(null, "Ctrl-O"),
                    exec: function(e) {
                        e.splitLine()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "transposeletters",
                    description: "Transpose letters",
                    bindKey: s("Alt-Shift-X", "Ctrl-T"),
                    exec: function(e) {
                        e.transposeLetters()
                    },
                    multiSelectAction: function(e) {
                        e.transposeSelections(1)
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "touppercase",
                    description: "To uppercase",
                    bindKey: s("Ctrl-U", "Ctrl-U"),
                    exec: function(e) {
                        e.toUpperCase()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "tolowercase",
                    description: "To lowercase",
                    bindKey: s("Ctrl-Shift-U", "Ctrl-Shift-U"),
                    exec: function(e) {
                        e.toLowerCase()
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor"
                }, {
                    name: "expandtoline",
                    description: "Expand to line",
                    bindKey: s("Ctrl-Shift-L", "Command-Shift-L"),
                    exec: function(e) {
                        var t = e.selection.getRange();
                        t.start.column = t.end.column = 0, t.end.row++, e.selection.setRange(t, !1)
                    },
                    multiSelectAction: "forEach",
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "joinlines",
                    description: "Join lines",
                    bindKey: s(null, null),
                    exec: function(e) {
                        for (var t = e.selection.isBackwards(), n = t ? e.selection.getSelectionLead() : e.selection.getSelectionAnchor(), i = t ? e.selection.getSelectionAnchor() : e.selection.getSelectionLead(), s = e.session.doc.getLine(n.row).length, a = e.session.doc.getTextRange(e.selection.getRange()).replace(/\n\s*/, " ").length, l = e.session.doc.getLine(n.row), c = n.row + 1; c <= i.row + 1; c++) {
                            var u = r.stringTrimLeft(r.stringTrimRight(e.session.doc.getLine(c)));
                            0 !== u.length && (u = " " + u), l += u
                        }
                        i.row + 1 < e.session.doc.getLength() - 1 && (l += e.session.doc.getNewLineCharacter()), e.clearSelection(), e.session.doc.replace(new o(n.row, 0, i.row + 2, 0), l), a > 0 ? (e.selection.moveCursorTo(n.row, n.column), e.selection.selectTo(n.row, n.column + a)) : (s = e.session.doc.getLine(n.row).length > s ? s + 1 : s, e.selection.moveCursorTo(n.row, s))
                    },
                    multiSelectAction: "forEach",
                    readOnly: !0
                }, {
                    name: "invertSelection",
                    description: "Invert selection",
                    bindKey: s(null, null),
                    exec: function(e) {
                        var t = e.session.doc.getLength() - 1,
                            n = e.session.doc.getLine(t).length,
                            r = e.selection.rangeList.ranges,
                            i = [];
                        r.length < 1 && (r = [e.selection.getRange()]);
                        for (var s = 0; s < r.length; s++) s == r.length - 1 && (r[s].end.row === t && r[s].end.column === n || i.push(new o(r[s].end.row, r[s].end.column, t, n))), 0 === s ? 0 === r[s].start.row && 0 === r[s].start.column || i.push(new o(0, 0, r[s].start.row, r[s].start.column)) : i.push(new o(r[s - 1].end.row, r[s - 1].end.column, r[s].start.row, r[s].start.column));
                        e.exitMultiSelectMode(), e.clearSelection();
                        for (s = 0; s < i.length; s++) e.selection.addRange(i[s], !1)
                    },
                    readOnly: !0,
                    scrollIntoView: "none"
                }, {
                    name: "openCommandPallete",
                    description: "Open command pallete",
                    bindKey: s("F1", "F1"),
                    exec: function(e) {
                        e.prompt({
                            $type: "commands"
                        })
                    },
                    readOnly: !0
                }, {
                    name: "modeSelect",
                    description: "Change language mode...",
                    bindKey: s(null, null),
                    exec: function(e) {
                        e.prompt({
                            $type: "modes"
                        })
                    },
                    readOnly: !0
                }]
            }), ace.define("ace/clipboard", [], function(e, t, n) {
                "use strict";
                n.exports = {
                    lineMode: !1
                }
            }), ace.define("ace/editor", [], function(e, t, n) {
                "use strict";
                e("./lib/fixoldbrowsers");
                var i = e("./lib/oop"),
                    o = e("./lib/dom"),
                    s = e("./lib/lang"),
                    a = e("./lib/useragent"),
                    l = e("./keyboard/textinput").TextInput,
                    c = e("./mouse/mouse_handler").MouseHandler,
                    u = e("./mouse/fold_handler").FoldHandler,
                    h = e("./keyboard/keybinding").KeyBinding,
                    d = e("./edit_session").EditSession,
                    f = e("./search").Search,
                    p = e("./range").Range,
                    g = e("./lib/event_emitter").EventEmitter,
                    m = e("./commands/command_manager").CommandManager,
                    v = e("./commands/default_commands").commands,
                    y = e("./config"),
                    b = e("./token_iterator").TokenIterator,
                    w = e("./clipboard"),
                    _ = function e(t, n, i) {
                        var o = t.getContainerElement();
                        this.container = o, this.renderer = t, this.id = "editor" + ++e.$uid, this.commands = new m(a.isMac ? "mac" : "win", v), "object" == ("undefined" == typeof document ? "undefined" : r(document)) && (this.textInput = new l(t.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.$mouseHandler = new c(this), new u(this)), this.keyBinding = new h(this), this.$search = (new f).set({
                            wrap: !0
                        }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = s.delayedCall(function() {
                            this._signal("input", {}), this.session && this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart()
                        }.bind(this)), this.on("change", function(e, t) {
                            t._$emitInputEvent.schedule(31)
                        }), this.setSession(n || i && i.session || new d("")), y.resetOptions(this), i && this.setOptions(i), y._signal("editor", this)
                    };
                _.$uid = 0,
                    function() {
                        i.implement(this, g), this.$initOperationListeners = function() {
                            this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = s.delayedCall(this.endOperation.bind(this, !0)), this.on("change", function() {
                                this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.docChanged = !0
                            }.bind(this), !0), this.on("changeSelection", function() {
                                this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.selectionChanged = !0
                            }.bind(this), !0)
                        }, this.curOp = null, this.prevOp = {}, this.startOperation = function(e) {
                            if (this.curOp) {
                                if (!e || this.curOp.command) return;
                                this.prevOp = this.curOp
                            }
                            e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = this.session.curOp = {
                                command: e.command || {},
                                args: e.args,
                                scrollTop: this.renderer.scrollTop
                            }, this.curOp.selectionBefore = this.selection.toJSON()
                        }, this.endOperation = function(e) {
                            if (this.curOp) {
                                if (e && !1 === e.returnValue) return this.curOp = null;
                                if (1 == e && this.curOp.command && "mouse" == this.curOp.command.name) return;
                                if (this._signal("beforeEndOperation"), !this.curOp) return;
                                var t = this.curOp.command,
                                    n = t && t.scrollIntoView;
                                if (n) {
                                    switch (n) {
                                        case "center-animate":
                                            n = "animate";
                                        case "center":
                                            this.renderer.scrollCursorIntoView(null, .5);
                                            break;
                                        case "animate":
                                        case "cursor":
                                            this.renderer.scrollCursorIntoView();
                                            break;
                                        case "selectionPart":
                                            var r = this.selection.getRange(),
                                                i = this.renderer.layerConfig;
                                            (r.start.row >= i.lastRow || r.end.row <= i.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
                                    }
                                    "animate" == n && this.renderer.animateScrolling(this.curOp.scrollTop)
                                }
                                var o = this.selection.toJSON();
                                this.curOp.selectionAfter = o, this.$lastSel = this.selection.toJSON(), this.session.getUndoManager().addSelection(o), this.prevOp = this.curOp, this.curOp = null
                            }
                        }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function(e) {
                            if (this.$mergeUndoDeltas) {
                                var t = this.prevOp,
                                    n = this.$mergeableCommands,
                                    r = t.command && e.command.name == t.command.name;
                                if ("insertstring" == e.command.name) {
                                    var i = e.args;
                                    void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), r = r && this.mergeNextCommand && (!/\s/.test(i) || /\s/.test(t.args)), this.mergeNextCommand = !0
                                } else r = r && -1 !== n.indexOf(e.command.name);
                                "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (r = !1), r ? this.session.mergeUndoDeltas = !0 : -1 !== n.indexOf(e.command.name) && (this.sequenceStartTime = Date.now())
                            }
                        }, this.setKeyboardHandler = function(e, t) {
                            if (e && "string" == typeof e && "ace" != e) {
                                this.$keybindingId = e;
                                var n = this;
                                y.loadModule(["keybinding", e], function(r) {
                                    n.$keybindingId == e && n.keyBinding.setKeyboardHandler(r && r.handler), t && t()
                                })
                            } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e), t && t()
                        }, this.getKeyboardHandler = function() {
                            return this.keyBinding.getKeyboardHandler()
                        }, this.setSession = function(e) {
                            if (this.session != e) {
                                this.curOp && this.endOperation(), this.curOp = {};
                                var t = this.session;
                                if (t) {
                                    this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
                                    var n = this.session.getSelection();
                                    n.off("changeCursor", this.$onCursorChange), n.off("changeSelection", this.$onSelectionChange)
                                }
                                this.session = e, e ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e.on("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.onCursorChange(), this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e)), this._signal("changeSession", {
                                    session: e,
                                    oldSession: t
                                }), this.curOp = null, t && t._signal("changeEditor", {
                                    oldEditor: this
                                }), e && e._signal("changeEditor", {
                                    editor: this
                                }), e && e.bgTokenizer && e.bgTokenizer.scheduleStart()
                            }
                        }, this.getSession = function() {
                            return this.session
                        }, this.setValue = function(e, t) {
                            return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e
                        }, this.getValue = function() {
                            return this.session.getValue()
                        }, this.getSelection = function() {
                            return this.selection
                        }, this.resize = function(e) {
                            this.renderer.onResize(e)
                        }, this.setTheme = function(e, t) {
                            this.renderer.setTheme(e, t)
                        }, this.getTheme = function() {
                            return this.renderer.getTheme()
                        }, this.setStyle = function(e) {
                            this.renderer.setStyle(e)
                        }, this.unsetStyle = function(e) {
                            this.renderer.unsetStyle(e)
                        }, this.getFontSize = function() {
                            return this.getOption("fontSize") || o.computedStyle(this.container).fontSize
                        }, this.setFontSize = function(e) {
                            this.setOption("fontSize", e)
                        }, this.$highlightBrackets = function() {
                            if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                                var e = this;
                                this.$highlightPending = !0, setTimeout(function() {
                                    e.$highlightPending = !1;
                                    var t = e.session;
                                    if (t && t.bgTokenizer) {
                                        var n = t.findMatchingBracket(e.getCursorPosition());
                                        if (n) var r = new p(n.row, n.column, n.row, n.column + 1);
                                        else if (t.$mode.getMatching) r = t.$mode.getMatching(e.session);
                                        r && (t.$bracketHighlight = t.addMarker(r, "ace_bracket", "text"))
                                    }
                                }, 50)
                            }
                        }, this.$highlightTags = function() {
                            if (!this.$highlightTagPending) {
                                var e = this;
                                this.$highlightTagPending = !0, setTimeout(function() {
                                    e.$highlightTagPending = !1;
                                    var t = e.session;
                                    if (t && t.bgTokenizer) {
                                        var n = e.getCursorPosition(),
                                            r = new b(e.session, n.row, n.column),
                                            i = r.getCurrentToken();
                                        if (!i || !/\b(?:tag-open|tag-name)/.test(i.type)) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                                        if (-1 == i.type.indexOf("tag-open") || (i = r.stepForward())) {
                                            var o = i.value,
                                                s = 0,
                                                a = r.stepBackward();
                                            if ("<" == a.value)
                                                do {
                                                    a = i, (i = r.stepForward()) && i.value === o && -1 !== i.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--)
                                                } while (i && s >= 0);
                                            else {
                                                do {
                                                    i = a, a = r.stepBackward(), i && i.value === o && -1 !== i.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--)
                                                } while (a && s <= 0);
                                                r.stepForward()
                                            }
                                            if (!i) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                                            var l = r.getCurrentTokenRow(),
                                                c = r.getCurrentTokenColumn(),
                                                u = new p(l, c, l, c + i.value.length),
                                                h = t.$backMarkers[t.$tagHighlight];
                                            t.$tagHighlight && null != h && 0 !== u.compareRange(h.range) && (t.removeMarker(t.$tagHighlight), t.$tagHighlight = null), t.$tagHighlight || (t.$tagHighlight = t.addMarker(u, "ace_bracket", "text"))
                                        }
                                    }
                                }, 50)
                            }
                        }, this.focus = function() {
                            var e = this;
                            setTimeout(function() {
                                e.isFocused() || e.textInput.focus()
                            }), this.textInput.focus()
                        }, this.isFocused = function() {
                            return this.textInput.isFocused()
                        }, this.blur = function() {
                            this.textInput.blur()
                        }, this.onFocus = function(e) {
                            this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e))
                        }, this.onBlur = function(e) {
                            this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e))
                        }, this.$cursorChange = function() {
                            this.renderer.updateCursor()
                        }, this.onDocumentChange = function(e) {
                            var t = this.session.$useWrapMode,
                                n = e.start.row == e.end.row ? e.end.row : 1 / 0;
                            this.renderer.updateLines(e.start.row, n, t), this._signal("change", e), this.$cursorChange(), this.$updateHighlightActiveLine()
                        }, this.onTokenizerUpdate = function(e) {
                            var t = e.data;
                            this.renderer.updateLines(t.first, t.last)
                        }, this.onScrollTopChange = function() {
                            this.renderer.scrollToY(this.session.getScrollTop())
                        }, this.onScrollLeftChange = function() {
                            this.renderer.scrollToX(this.session.getScrollLeft())
                        }, this.onCursorChange = function() {
                            this.$cursorChange(), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine(), this._signal("changeSelection")
                        }, this.$updateHighlightActiveLine = function() {
                            var e, t = this.getSession();
                            if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), this.renderer.theme && this.renderer.theme.$selectionColorConflict && !this.selection.isEmpty() && (e = !1), !this.renderer.$maxLines || 1 !== this.session.getLength() || this.renderer.$minLines > 1 || (e = !1)), t.$highlightLineMarker && !e) t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;
                            else if (!t.$highlightLineMarker && e) {
                                var n = new p(e.row, e.column, e.row, 1 / 0);
                                n.id = t.addMarker(n, "ace_active-line", "screenLine"), t.$highlightLineMarker = n
                            } else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._signal("changeBackMarker"))
                        }, this.onSelectionChange = function(e) {
                            var t = this.session;
                            if (t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();
                            else {
                                var n = this.selection.getRange(),
                                    r = this.getSelectionStyle();
                                t.$selectionMarker = t.addMarker(n, "ace_selection", r)
                            }
                            var i = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                            this.session.highlight(i), this._signal("changeSelection")
                        }, this.$getSelectionHighLightRegexp = function() {
                            var e = this.session,
                                t = this.getSelectionRange();
                            if (!t.isEmpty() && !t.isMultiLine()) {
                                var n = t.start.column,
                                    r = t.end.column,
                                    i = e.getLine(t.start.row),
                                    o = i.substring(n, r);
                                if (!(o.length > 5e3) && /[\w\d]/.test(o)) {
                                    var s = this.$search.$assembleRegExp({
                                            wholeWord: !0,
                                            caseSensitive: !0,
                                            needle: o
                                        }),
                                        a = i.substring(n - 1, r + 1);
                                    if (s.test(a)) return s
                                }
                            }
                        }, this.onChangeFrontMarker = function() {
                            this.renderer.updateFrontMarkers()
                        }, this.onChangeBackMarker = function() {
                            this.renderer.updateBackMarkers()
                        }, this.onChangeBreakpoint = function() {
                            this.renderer.updateBreakpoints()
                        }, this.onChangeAnnotation = function() {
                            this.renderer.setAnnotations(this.session.getAnnotations())
                        }, this.onChangeMode = function(e) {
                            this.renderer.updateText(), this._emit("changeMode", e)
                        }, this.onChangeWrapLimit = function() {
                            this.renderer.updateFull()
                        }, this.onChangeWrapMode = function() {
                            this.renderer.onResize(!0)
                        }, this.onChangeFold = function() {
                            this.$updateHighlightActiveLine(), this.renderer.updateFull()
                        }, this.getSelectedText = function() {
                            return this.session.getTextRange(this.getSelectionRange())
                        }, this.getCopyText = function() {
                            var e = this.getSelectedText(),
                                t = this.session.doc.getNewLineCharacter(),
                                n = !1;
                            if (!e && this.$copyWithEmptySelection) {
                                n = !0;
                                for (var r = this.selection.getAllRanges(), i = 0; i < r.length; i++) {
                                    var o = r[i];
                                    i && r[i - 1].start.row == o.start.row || (e += this.session.getLine(o.start.row) + t)
                                }
                            }
                            var s = {
                                text: e
                            };
                            return this._signal("copy", s), w.lineMode = n ? s.text : "", s.text
                        }, this.onCopy = function() {
                            this.commands.exec("copy", this)
                        }, this.onCut = function() {
                            this.commands.exec("cut", this)
                        }, this.onPaste = function(e, t) {
                            var n = {
                                text: e,
                                event: t
                            };
                            this.commands.exec("paste", this, n)
                        }, this.$handlePaste = function(e) {
                            "string" == typeof e && (e = {
                                text: e
                            }), this._signal("paste", e);
                            var t = e.text,
                                n = t == w.lineMode,
                                r = this.session;
                            if (!this.inMultiSelectMode || this.inVirtualSelectionMode) n ? r.insert({
                                row: this.selection.lead.row,
                                column: 0
                            }, t) : this.insert(t);
                            else if (n) this.selection.rangeList.ranges.forEach(function(e) {
                                r.insert({
                                    row: e.start.row,
                                    column: 0
                                }, t)
                            });
                            else {
                                var i = t.split(/\r\n|\r|\n/),
                                    o = this.selection.rangeList.ranges;
                                if (i.length > o.length || i.length < 2 || !i[1]) return this.commands.exec("insertstring", this, t);
                                for (var s = o.length; s--;) {
                                    var a = o[s];
                                    a.isEmpty() || r.remove(a), r.insert(a.start, i[s])
                                }
                            }
                        }, this.execCommand = function(e, t) {
                            return this.commands.exec(e, this, t)
                        }, this.insert = function(e, t) {
                            var n = this.session,
                                r = n.getMode(),
                                i = this.getCursorPosition();
                            if (this.getBehavioursEnabled() && !t) {
                                var o = r.transformAction(n.getState(i.row), "insertion", this, n, e);
                                o && (e !== o.text && (this.inVirtualSelectionMode || (this.session.mergeUndoDeltas = !1, this.mergeNextCommand = !1)), e = o.text)
                            }
                            if ("\t" == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
                                if (this.session.getOverwrite() && -1 == e.indexOf("\n")) {
                                    (s = new p.fromPoints(i, i)).end.column += e.length, this.session.remove(s)
                                }
                            } else {
                                var s = this.getSelectionRange();
                                i = this.session.remove(s), this.clearSelection()
                            }
                            if ("\n" == e || "\r\n" == e) {
                                var a = n.getLine(i.row);
                                if (i.column > a.search(/\S|$/)) {
                                    var l = a.substr(i.column).search(/\S|$/);
                                    n.doc.removeInLine(i.row, i.column, i.column + l)
                                }
                            }
                            this.clearSelection();
                            var c = i.column,
                                u = n.getState(i.row),
                                h = (a = n.getLine(i.row), r.checkOutdent(u, a, e));
                            n.insert(i, e);
                            if (o && o.selection && (2 == o.selection.length ? this.selection.setSelectionRange(new p(i.row, c + o.selection[0], i.row, c + o.selection[1])) : this.selection.setSelectionRange(new p(i.row + o.selection[0], o.selection[1], i.row + o.selection[2], o.selection[3]))), n.getDocument().isNewLine(e)) {
                                var d = r.getNextLineIndent(u, a.slice(0, i.column), n.getTabString());
                                n.insert({
                                    row: i.row + 1,
                                    column: 0
                                }, d)
                            }
                            h && r.autoOutdent(u, n, i.row)
                        }, this.onTextInput = function(e, t) {
                            if (!t) return this.keyBinding.onTextInput(e);
                            this.startOperation({
                                command: {
                                    name: "insertstring"
                                }
                            });
                            var n = this.applyComposition.bind(this, e, t);
                            this.selection.rangeCount ? this.forEachSelection(n) : n(), this.endOperation()
                        }, this.applyComposition = function(e, t) {
                            var n;
                            (t.extendLeft || t.extendRight) && ((n = this.selection.getRange()).start.column -= t.extendLeft, n.end.column += t.extendRight, this.selection.setRange(n), e || n.isEmpty() || this.remove());
                            (!e && this.selection.isEmpty() || this.insert(e, !0), t.restoreStart || t.restoreEnd) && ((n = this.selection.getRange()).start.column -= t.restoreStart, n.end.column -= t.restoreEnd, this.selection.setRange(n))
                        }, this.onCommandKey = function(e, t, n) {
                            this.keyBinding.onCommandKey(e, t, n)
                        }, this.setOverwrite = function(e) {
                            this.session.setOverwrite(e)
                        }, this.getOverwrite = function() {
                            return this.session.getOverwrite()
                        }, this.toggleOverwrite = function() {
                            this.session.toggleOverwrite()
                        }, this.setScrollSpeed = function(e) {
                            this.setOption("scrollSpeed", e)
                        }, this.getScrollSpeed = function() {
                            return this.getOption("scrollSpeed")
                        }, this.setDragDelay = function(e) {
                            this.setOption("dragDelay", e)
                        }, this.getDragDelay = function() {
                            return this.getOption("dragDelay")
                        }, this.setSelectionStyle = function(e) {
                            this.setOption("selectionStyle", e)
                        }, this.getSelectionStyle = function() {
                            return this.getOption("selectionStyle")
                        }, this.setHighlightActiveLine = function(e) {
                            this.setOption("highlightActiveLine", e)
                        }, this.getHighlightActiveLine = function() {
                            return this.getOption("highlightActiveLine")
                        }, this.setHighlightGutterLine = function(e) {
                            this.setOption("highlightGutterLine", e)
                        }, this.getHighlightGutterLine = function() {
                            return this.getOption("highlightGutterLine")
                        }, this.setHighlightSelectedWord = function(e) {
                            this.setOption("highlightSelectedWord", e)
                        }, this.getHighlightSelectedWord = function() {
                            return this.$highlightSelectedWord
                        }, this.setAnimatedScroll = function(e) {
                            this.renderer.setAnimatedScroll(e)
                        }, this.getAnimatedScroll = function() {
                            return this.renderer.getAnimatedScroll()
                        }, this.setShowInvisibles = function(e) {
                            this.renderer.setShowInvisibles(e)
                        }, this.getShowInvisibles = function() {
                            return this.renderer.getShowInvisibles()
                        }, this.setDisplayIndentGuides = function(e) {
                            this.renderer.setDisplayIndentGuides(e)
                        }, this.getDisplayIndentGuides = function() {
                            return this.renderer.getDisplayIndentGuides()
                        }, this.setShowPrintMargin = function(e) {
                            this.renderer.setShowPrintMargin(e)
                        }, this.getShowPrintMargin = function() {
                            return this.renderer.getShowPrintMargin()
                        }, this.setPrintMarginColumn = function(e) {
                            this.renderer.setPrintMarginColumn(e)
                        }, this.getPrintMarginColumn = function() {
                            return this.renderer.getPrintMarginColumn()
                        }, this.setReadOnly = function(e) {
                            this.setOption("readOnly", e)
                        }, this.getReadOnly = function() {
                            return this.getOption("readOnly")
                        }, this.setBehavioursEnabled = function(e) {
                            this.setOption("behavioursEnabled", e)
                        }, this.getBehavioursEnabled = function() {
                            return this.getOption("behavioursEnabled")
                        }, this.setWrapBehavioursEnabled = function(e) {
                            this.setOption("wrapBehavioursEnabled", e)
                        }, this.getWrapBehavioursEnabled = function() {
                            return this.getOption("wrapBehavioursEnabled")
                        }, this.setShowFoldWidgets = function(e) {
                            this.setOption("showFoldWidgets", e)
                        }, this.getShowFoldWidgets = function() {
                            return this.getOption("showFoldWidgets")
                        }, this.setFadeFoldWidgets = function(e) {
                            this.setOption("fadeFoldWidgets", e)
                        }, this.getFadeFoldWidgets = function() {
                            return this.getOption("fadeFoldWidgets")
                        }, this.remove = function(e) {
                            this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
                            var t = this.getSelectionRange();
                            if (this.getBehavioursEnabled()) {
                                var n = this.session,
                                    r = n.getState(t.start.row),
                                    i = n.getMode().transformAction(r, "deletion", this, n, t);
                                if (0 === t.end.column) {
                                    var o = n.getTextRange(t);
                                    if ("\n" == o[o.length - 1]) {
                                        var s = n.getLine(t.end.row);
                                        /^\s+$/.test(s) && (t.end.column = s.length)
                                    }
                                }
                                i && (t = i)
                            }
                            this.session.remove(t), this.clearSelection()
                        }, this.removeWordRight = function() {
                            this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                        }, this.removeWordLeft = function() {
                            this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                        }, this.removeToLineStart = function() {
                            this.selection.isEmpty() && this.selection.selectLineStart(), this.selection.isEmpty() && this.selection.selectLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                        }, this.removeToLineEnd = function() {
                            this.selection.isEmpty() && this.selection.selectLineEnd();
                            var e = this.getSelectionRange();
                            e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
                        }, this.splitLine = function() {
                            this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                            var e = this.getCursorPosition();
                            this.insert("\n"), this.moveCursorToPosition(e)
                        }, this.transposeLetters = function() {
                            if (this.selection.isEmpty()) {
                                var e = this.getCursorPosition(),
                                    t = e.column;
                                if (0 !== t) {
                                    var n, r, i = this.session.getLine(e.row);
                                    t < i.length ? (n = i.charAt(t) + i.charAt(t - 1), r = new p(e.row, t - 1, e.row, t + 1)) : (n = i.charAt(t - 1) + i.charAt(t - 2), r = new p(e.row, t - 2, e.row, t)), this.session.replace(r, n), this.session.selection.moveToPosition(r.end)
                                }
                            }
                        }, this.toLowerCase = function() {
                            var e = this.getSelectionRange();
                            this.selection.isEmpty() && this.selection.selectWord();
                            var t = this.getSelectionRange(),
                                n = this.session.getTextRange(t);
                            this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e)
                        }, this.toUpperCase = function() {
                            var e = this.getSelectionRange();
                            this.selection.isEmpty() && this.selection.selectWord();
                            var t = this.getSelectionRange(),
                                n = this.session.getTextRange(t);
                            this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e)
                        }, this.indent = function() {
                            var e = this.session,
                                t = this.getSelectionRange();
                            if (!(t.start.row < t.end.row)) {
                                if (t.start.column < t.end.column) {
                                    var n = e.getTextRange(t);
                                    if (!/^\s+$/.test(n)) {
                                        u = this.$getSelectedRows();
                                        return void e.indentRows(u.first, u.last, "\t")
                                    }
                                }
                                var r = e.getLine(t.start.row),
                                    i = t.start,
                                    o = e.getTabSize(),
                                    a = e.documentToScreenColumn(i.row, i.column);
                                if (this.session.getUseSoftTabs()) var l = o - a % o,
                                    c = s.stringRepeat(" ", l);
                                else {
                                    for (l = a % o;
                                         " " == r[t.start.column - 1] && l;) t.start.column--, l--;
                                    this.selection.setSelectionRange(t), c = "\t"
                                }
                                return this.insert(c)
                            }
                            var u = this.$getSelectedRows();
                            e.indentRows(u.first, u.last, "\t")
                        }, this.blockIndent = function() {
                            var e = this.$getSelectedRows();
                            this.session.indentRows(e.first, e.last, "\t")
                        }, this.blockOutdent = function() {
                            var e = this.session.getSelection();
                            this.session.outdentRows(e.getRange())
                        }, this.sortLines = function() {
                            for (var e = this.$getSelectedRows(), t = this.session, n = [], r = e.first; r <= e.last; r++) n.push(t.getLine(r));
                            n.sort(function(e, t) {
                                return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
                            });
                            var i = new p(0, 0, 0, 0);
                            for (r = e.first; r <= e.last; r++) {
                                var o = t.getLine(r);
                                i.start.row = r, i.end.row = r, i.end.column = o.length, t.replace(i, n[r - e.first])
                            }
                        }, this.toggleCommentLines = function() {
                            var e = this.session.getState(this.getCursorPosition().row),
                                t = this.$getSelectedRows();
                            this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
                        }, this.toggleBlockComment = function() {
                            var e = this.getCursorPosition(),
                                t = this.session.getState(e.row),
                                n = this.getSelectionRange();
                            this.session.getMode().toggleBlockComment(t, this.session, n, e)
                        }, this.getNumberAt = function(e, t) {
                            var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
                            n.lastIndex = 0;
                            for (var r = this.session.getLine(e); n.lastIndex < t;) {
                                var i = n.exec(r);
                                if (i.index <= t && i.index + i[0].length >= t) return {
                                    value: i[0],
                                    start: i.index,
                                    end: i.index + i[0].length
                                }
                            }
                            return null
                        }, this.modifyNumber = function(e) {
                            var t = this.selection.getCursor().row,
                                n = this.selection.getCursor().column,
                                r = new p(t, n - 1, t, n),
                                i = this.session.getTextRange(r);
                            if (!isNaN(parseFloat(i)) && isFinite(i)) {
                                var o = this.getNumberAt(t, n);
                                if (o) {
                                    var s = o.value.indexOf(".") >= 0 ? o.start + o.value.indexOf(".") + 1 : o.end,
                                        a = o.start + o.value.length - s,
                                        l = parseFloat(o.value);
                                    l *= Math.pow(10, a), s !== o.end && n < s ? e *= Math.pow(10, o.end - n - 1) : e *= Math.pow(10, o.end - n), l += e;
                                    var c = (l /= Math.pow(10, a)).toFixed(a),
                                        u = new p(t, o.start, t, o.end);
                                    this.session.replace(u, c), this.moveCursorTo(t, Math.max(o.start + 1, n + c.length - o.value.length))
                                }
                            } else this.toggleWord()
                        }, this.$toggleWordPairs = [
                            ["first", "last"],
                            ["true", "false"],
                            ["yes", "no"],
                            ["width", "height"],
                            ["top", "bottom"],
                            ["right", "left"],
                            ["on", "off"],
                            ["x", "y"],
                            ["get", "set"],
                            ["max", "min"],
                            ["horizontal", "vertical"],
                            ["show", "hide"],
                            ["add", "remove"],
                            ["up", "down"],
                            ["before", "after"],
                            ["even", "odd"],
                            ["inside", "outside"],
                            ["next", "previous"],
                            ["increase", "decrease"],
                            ["attach", "detach"],
                            ["&&", "||"],
                            ["==", "!="]
                        ], this.toggleWord = function() {
                            var e = this.selection.getCursor().row,
                                t = this.selection.getCursor().column;
                            this.selection.selectWord();
                            var n = this.getSelectedText(),
                                r = this.selection.getWordRange().start.column,
                                i = n.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ").split(/\s/),
                                o = t - r - 1;
                            o < 0 && (o = 0);
                            var a = 0,
                                l = 0,
                                c = this;
                            n.match(/[A-Za-z0-9_]+/) && i.forEach(function(t, i) {
                                l = a + t.length, o >= a && o <= l && (n = t, c.selection.clearSelection(), c.moveCursorTo(e, a + r), c.selection.selectTo(e, l + r)), a = l
                            });
                            for (var u, h = this.$toggleWordPairs, d = 0; d < h.length; d++)
                                for (var f = h[d], p = 0; p <= 1; p++) {
                                    var g = +!p,
                                        m = n.match(new RegExp("^\\s?_?(" + s.escapeRegExp(f[p]) + ")\\s?$", "i"));
                                    if (m) n.match(new RegExp("([_]|^|\\s)(" + s.escapeRegExp(m[1]) + ")($|\\s)", "g")) && (u = n.replace(new RegExp(s.escapeRegExp(f[p]), "i"), function(e) {
                                        var t = f[g];
                                        return e.toUpperCase() == e ? t = t.toUpperCase() : e.charAt(0).toUpperCase() == e.charAt(0) && (t = t.substr(0, 0) + f[g].charAt(0).toUpperCase() + t.substr(1)), t
                                    }), this.insert(u), u = "")
                                }
                        }, this.removeLines = function() {
                            var e = this.$getSelectedRows();
                            this.session.removeFullLines(e.first, e.last), this.clearSelection()
                        }, this.duplicateSelection = function() {
                            var e = this.selection,
                                t = this.session,
                                n = e.getRange(),
                                r = e.isBackwards();
                            if (n.isEmpty()) {
                                var i = n.start.row;
                                t.duplicateLines(i, i)
                            } else {
                                var o = r ? n.start : n.end,
                                    s = t.insert(o, t.getTextRange(n), !1);
                                n.start = o, n.end = s, e.setSelectionRange(n, r)
                            }
                        }, this.moveLinesDown = function() {
                            this.$moveLines(1, !1)
                        }, this.moveLinesUp = function() {
                            this.$moveLines(-1, !1)
                        }, this.moveText = function(e, t, n) {
                            return this.session.moveText(e, t, n)
                        }, this.copyLinesUp = function() {
                            this.$moveLines(-1, !0)
                        }, this.copyLinesDown = function() {
                            this.$moveLines(1, !0)
                        }, this.$moveLines = function(e, t) {
                            var n, r, i = this.selection;
                            if (!i.inMultiSelectMode || this.inVirtualSelectionMode) {
                                var o = i.toOrientedRange();
                                n = this.$getSelectedRows(o), r = this.session.$moveLines(n.first, n.last, t ? 0 : e), t && -1 == e && (r = 0), o.moveBy(r, 0), i.fromOrientedRange(o)
                            } else {
                                var s = i.rangeList.ranges;
                                i.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
                                for (var a = 0, l = 0, c = s.length, u = 0; u < c; u++) {
                                    var h = u;
                                    s[u].moveBy(a, 0);
                                    for (var d = (n = this.$getSelectedRows(s[u])).first, f = n.last; ++u < c;) {
                                        l && s[u].moveBy(l, 0);
                                        var p = this.$getSelectedRows(s[u]);
                                        if (t && p.first != f) break;
                                        if (!t && p.first > f + 1) break;
                                        f = p.last
                                    }
                                    for (u--, a = this.session.$moveLines(d, f, t ? 0 : e), t && -1 == e && (h = u + 1); h <= u;) s[h].moveBy(a, 0), h++;
                                    t || (a = 0), l += a
                                }
                                i.fromOrientedRange(i.ranges[0]), i.rangeList.attach(this.session), this.inVirtualSelectionMode = !1
                            }
                        }, this.$getSelectedRows = function(e) {
                            return e = (e || this.getSelectionRange()).collapseRows(), {
                                first: this.session.getRowFoldStart(e.start.row),
                                last: this.session.getRowFoldEnd(e.end.row)
                            }
                        }, this.onCompositionStart = function(e) {
                            this.renderer.showComposition(e)
                        }, this.onCompositionUpdate = function(e) {
                            this.renderer.setCompositionText(e)
                        }, this.onCompositionEnd = function() {
                            this.renderer.hideComposition()
                        }, this.getFirstVisibleRow = function() {
                            return this.renderer.getFirstVisibleRow()
                        }, this.getLastVisibleRow = function() {
                            return this.renderer.getLastVisibleRow()
                        }, this.isRowVisible = function(e) {
                            return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
                        }, this.isRowFullyVisible = function(e) {
                            return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
                        }, this.$getVisibleRowCount = function() {
                            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
                        }, this.$moveByPage = function(e, t) {
                            var n = this.renderer,
                                r = this.renderer.layerConfig,
                                i = e * Math.floor(r.height / r.lineHeight);
                            !0 === t ? this.selection.$moveSelection(function() {
                                this.moveCursorBy(i, 0)
                            }) : !1 === t && (this.selection.moveCursorBy(i, 0), this.selection.clearSelection());
                            var o = n.scrollTop;
                            n.scrollBy(0, i * r.lineHeight), null != t && n.scrollCursorIntoView(null, .5), n.animateScrolling(o)
                        }, this.selectPageDown = function() {
                            this.$moveByPage(1, !0)
                        }, this.selectPageUp = function() {
                            this.$moveByPage(-1, !0)
                        }, this.gotoPageDown = function() {
                            this.$moveByPage(1, !1)
                        }, this.gotoPageUp = function() {
                            this.$moveByPage(-1, !1)
                        }, this.scrollPageDown = function() {
                            this.$moveByPage(1)
                        }, this.scrollPageUp = function() {
                            this.$moveByPage(-1)
                        }, this.scrollToRow = function(e) {
                            this.renderer.scrollToRow(e)
                        }, this.scrollToLine = function(e, t, n, r) {
                            this.renderer.scrollToLine(e, t, n, r)
                        }, this.centerSelection = function() {
                            var e = this.getSelectionRange(),
                                t = {
                                    row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
                                    column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
                                };
                            this.renderer.alignCursor(t, .5)
                        }, this.getCursorPosition = function() {
                            return this.selection.getCursor()
                        }, this.getCursorPositionScreen = function() {
                            return this.session.documentToScreenPosition(this.getCursorPosition())
                        }, this.getSelectionRange = function() {
                            return this.selection.getRange()
                        }, this.selectAll = function() {
                            this.selection.selectAll()
                        }, this.clearSelection = function() {
                            this.selection.clearSelection()
                        }, this.moveCursorTo = function(e, t) {
                            this.selection.moveCursorTo(e, t)
                        }, this.moveCursorToPosition = function(e) {
                            this.selection.moveCursorToPosition(e)
                        }, this.jumpToMatching = function(e, t) {
                            var n = this.getCursorPosition(),
                                r = new b(this.session, n.row, n.column),
                                i = r.getCurrentToken(),
                                o = i || r.stepForward();
                            if (o) {
                                var s, a, l = !1,
                                    c = {},
                                    u = n.column - o.start,
                                    h = {
                                        ")": "(",
                                        "(": "(",
                                        "]": "[",
                                        "[": "[",
                                        "{": "{",
                                        "}": "{"
                                    };
                                do {
                                    if (o.value.match(/[{}()\[\]]/g)) {
                                        for (; u < o.value.length && !l; u++)
                                            if (h[o.value[u]]) switch (a = h[o.value[u]] + "." + o.type.replace("rparen", "lparen"), isNaN(c[a]) && (c[a] = 0), o.value[u]) {
                                                case "(":
                                                case "[":
                                                case "{":
                                                    c[a]++;
                                                    break;
                                                case ")":
                                                case "]":
                                                case "}":
                                                    c[a]--, -1 === c[a] && (s = "bracket", l = !0)
                                            }
                                    } else -1 !== o.type.indexOf("tag-name") && (isNaN(c[o.value]) && (c[o.value] = 0), "<" === i.value ? c[o.value]++ : "</" === i.value && c[o.value]--, -1 === c[o.value] && (s = "tag", l = !0));
                                    l || (i = o, o = r.stepForward(), u = 0)
                                } while (o && !l);
                                if (s) {
                                    var d, f;
                                    if ("bracket" === s)(d = this.session.getBracketRange(n)) || (f = (d = new p(r.getCurrentTokenRow(), r.getCurrentTokenColumn() + u - 1, r.getCurrentTokenRow(), r.getCurrentTokenColumn() + u - 1)).start, (t || f.row === n.row && Math.abs(f.column - n.column) < 2) && (d = this.session.getBracketRange(f)));
                                    else if ("tag" === s) {
                                        if (!o || -1 === o.type.indexOf("tag-name")) return;
                                        var g = o.value;
                                        if (0 === (d = new p(r.getCurrentTokenRow(), r.getCurrentTokenColumn() - 2, r.getCurrentTokenRow(), r.getCurrentTokenColumn() - 2)).compare(n.row, n.column)) {
                                            l = !1;
                                            do {
                                                o = i, (i = r.stepBackward()) && (-1 !== i.type.indexOf("tag-close") && d.setEnd(r.getCurrentTokenRow(), r.getCurrentTokenColumn() + 1), o.value === g && -1 !== o.type.indexOf("tag-name") && ("<" === i.value ? c[g]++ : "</" === i.value && c[g]--, 0 === c[g] && (l = !0)))
                                            } while (i && !l)
                                        }
                                        o && o.type.indexOf("tag-name") && (f = d.start).row == n.row && Math.abs(f.column - n.column) < 2 && (f = d.end)
                                    }(f = d && d.cursor || f) && (e ? d && t ? this.selection.setRange(d) : d && d.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(f.row, f.column) : this.selection.moveTo(f.row, f.column))
                                }
                            }
                        }, this.gotoLine = function(e, t, n) {
                            this.selection.clearSelection(), this.session.unfold({
                                row: e - 1,
                                column: t || 0
                            }), this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n)
                        }, this.navigateTo = function(e, t) {
                            this.selection.moveTo(e, t)
                        }, this.navigateUp = function(e) {
                            if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                                var t = this.selection.anchor.getPosition();
                                return this.moveCursorToPosition(t)
                            }
                            this.selection.clearSelection(), this.selection.moveCursorBy(-e || -1, 0)
                        }, this.navigateDown = function(e) {
                            if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                                var t = this.selection.anchor.getPosition();
                                return this.moveCursorToPosition(t)
                            }
                            this.selection.clearSelection(), this.selection.moveCursorBy(e || 1, 0)
                        }, this.navigateLeft = function(e) {
                            if (this.selection.isEmpty())
                                for (e = e || 1; e--;) this.selection.moveCursorLeft();
                            else {
                                var t = this.getSelectionRange().start;
                                this.moveCursorToPosition(t)
                            }
                            this.clearSelection()
                        }, this.navigateRight = function(e) {
                            if (this.selection.isEmpty())
                                for (e = e || 1; e--;) this.selection.moveCursorRight();
                            else {
                                var t = this.getSelectionRange().end;
                                this.moveCursorToPosition(t)
                            }
                            this.clearSelection()
                        }, this.navigateLineStart = function() {
                            this.selection.moveCursorLineStart(), this.clearSelection()
                        }, this.navigateLineEnd = function() {
                            this.selection.moveCursorLineEnd(), this.clearSelection()
                        }, this.navigateFileEnd = function() {
                            this.selection.moveCursorFileEnd(), this.clearSelection()
                        }, this.navigateFileStart = function() {
                            this.selection.moveCursorFileStart(), this.clearSelection()
                        }, this.navigateWordRight = function() {
                            this.selection.moveCursorWordRight(), this.clearSelection()
                        }, this.navigateWordLeft = function() {
                            this.selection.moveCursorWordLeft(), this.clearSelection()
                        }, this.replace = function(e, t) {
                            t && this.$search.set(t);
                            var n = this.$search.find(this.session),
                                r = 0;
                            return n ? (this.$tryReplace(n, e) && (r = 1), this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end), r) : r
                        }, this.replaceAll = function(e, t) {
                            t && this.$search.set(t);
                            var n = this.$search.findAll(this.session),
                                r = 0;
                            if (!n.length) return r;
                            var i = this.getSelectionRange();
                            this.selection.moveTo(0, 0);
                            for (var o = n.length - 1; o >= 0; --o) this.$tryReplace(n[o], e) && r++;
                            return this.selection.setSelectionRange(i), r
                        }, this.$tryReplace = function(e, t) {
                            var n = this.session.getTextRange(e);
                            return null !== (t = this.$search.replace(n, t)) ? (e.end = this.session.replace(e, t), e) : null
                        }, this.getLastSearchOptions = function() {
                            return this.$search.getOptions()
                        }, this.find = function(e, t, n) {
                            t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == r(e) && i.mixin(t, e);
                            var o = this.selection.getRange();
                            null == t.needle && ((e = this.session.getTextRange(o) || this.$search.$options.needle) || (o = this.session.getWordRange(o.start.row, o.start.column), e = this.session.getTextRange(o)), this.$search.set({
                                needle: e
                            })), this.$search.set(t), t.start || this.$search.set({
                                start: o
                            });
                            var s = this.$search.find(this.session);
                            return t.preventScroll ? s : s ? (this.revealRange(s, n), s) : (t.backwards ? o.start = o.end : o.end = o.start, void this.selection.setRange(o))
                        }, this.findNext = function(e, t) {
                            this.find({
                                skipCurrent: !0,
                                backwards: !1
                            }, e, t)
                        }, this.findPrevious = function(e, t) {
                            this.find(e, {
                                skipCurrent: !0,
                                backwards: !0
                            }, t)
                        }, this.revealRange = function(e, t) {
                            this.session.unfold(e), this.selection.setSelectionRange(e);
                            var n = this.renderer.scrollTop;
                            this.renderer.scrollSelectionIntoView(e.start, e.end, .5), !1 !== t && this.renderer.animateScrolling(n)
                        }, this.undo = function() {
                            this.session.getUndoManager().undo(this.session), this.renderer.scrollCursorIntoView(null, .5)
                        }, this.redo = function() {
                            this.session.getUndoManager().redo(this.session), this.renderer.scrollCursorIntoView(null, .5)
                        }, this.destroy = function() {
                            this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy()
                        }, this.setAutoScrollEditorIntoView = function(e) {
                            if (e) {
                                var t, n = this,
                                    r = !1;
                                this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                                var i = this.$scrollAnchor;
                                i.style.cssText = "position:absolute", this.container.insertBefore(i, this.container.firstChild);
                                var o = this.on("changeSelection", function() {
                                        r = !0
                                    }),
                                    s = this.renderer.on("beforeRender", function() {
                                        r && (t = n.renderer.container.getBoundingClientRect())
                                    }),
                                    a = this.renderer.on("afterRender", function() {
                                        if (r && t && (n.isFocused() || n.searchBox && n.searchBox.isFocused())) {
                                            var e = n.renderer,
                                                o = e.$cursorLayer.$pixelPos,
                                                s = e.layerConfig,
                                                a = o.top - s.offset;
                                            null != (r = o.top >= 0 && a + t.top < 0 || !(o.top < s.height && o.top + t.top + s.lineHeight > window.innerHeight) && null) && (i.style.top = a + "px", i.style.left = o.left + "px", i.style.height = s.lineHeight + "px", i.scrollIntoView(r)), r = t = null
                                        }
                                    });
                                this.setAutoScrollEditorIntoView = function(e) {
                                    e || (delete this.setAutoScrollEditorIntoView, this.off("changeSelection", o), this.renderer.off("afterRender", a), this.renderer.off("beforeRender", s))
                                }
                            }
                        }, this.$resetCursorStyle = function() {
                            var e = this.$cursorStyle || "ace",
                                t = this.renderer.$cursorLayer;
                            t && (t.setSmoothBlinking(/smooth/.test(e)), t.isBlinking = !this.$readOnly && "wide" != e, o.setCssClass(t.element, "ace_slim-cursors", /slim/.test(e)))
                        }, this.prompt = function(e, t, n) {
                            var r = this;
                            y.loadModule("./ext/prompt", function(i) {
                                i.prompt(r, e, t, n)
                            })
                        }
                    }.call(_.prototype), y.defineOptions(_.prototype, "editor", {
                    selectionStyle: {
                        set: function(e) {
                            this.onSelectionChange(), this._signal("changeSelectionStyle", {
                                data: e
                            })
                        },
                        initialValue: "line"
                    },
                    highlightActiveLine: {
                        set: function() {
                            this.$updateHighlightActiveLine()
                        },
                        initialValue: !0
                    },
                    highlightSelectedWord: {
                        set: function(e) {
                            this.$onSelectionChange()
                        },
                        initialValue: !0
                    },
                    readOnly: {
                        set: function(e) {
                            this.textInput.setReadOnly(e), this.$resetCursorStyle()
                        },
                        initialValue: !1
                    },
                    copyWithEmptySelection: {
                        set: function(e) {
                            this.textInput.setCopyWithEmptySelection(e)
                        },
                        initialValue: !1
                    },
                    cursorStyle: {
                        set: function(e) {
                            this.$resetCursorStyle()
                        },
                        values: ["ace", "slim", "smooth", "wide"],
                        initialValue: "ace"
                    },
                    mergeUndoDeltas: {
                        values: [!1, !0, "always"],
                        initialValue: !0
                    },
                    behavioursEnabled: {
                        initialValue: !0
                    },
                    wrapBehavioursEnabled: {
                        initialValue: !0
                    },
                    autoScrollEditorIntoView: {
                        set: function(e) {
                            this.setAutoScrollEditorIntoView(e)
                        }
                    },
                    keyboardHandler: {
                        set: function(e) {
                            this.setKeyboardHandler(e)
                        },
                        get: function() {
                            return this.$keybindingId
                        },
                        handlesSet: !0
                    },
                    value: {
                        set: function(e) {
                            this.session.setValue(e)
                        },
                        get: function() {
                            return this.getValue()
                        },
                        handlesSet: !0,
                        hidden: !0
                    },
                    session: {
                        set: function(e) {
                            this.setSession(e)
                        },
                        get: function() {
                            return this.session
                        },
                        handlesSet: !0,
                        hidden: !0
                    },
                    showLineNumbers: {
                        set: function(e) {
                            this.renderer.$gutterLayer.setShowLineNumbers(e), this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER), e && this.$relativeLineNumbers ? C.attach(this) : C.detach(this)
                        },
                        initialValue: !0
                    },
                    relativeLineNumbers: {
                        set: function(e) {
                            this.$showLineNumbers && e ? C.attach(this) : C.detach(this)
                        }
                    },
                    hScrollBarAlwaysVisible: "renderer",
                    vScrollBarAlwaysVisible: "renderer",
                    highlightGutterLine: "renderer",
                    animatedScroll: "renderer",
                    showInvisibles: "renderer",
                    showPrintMargin: "renderer",
                    printMarginColumn: "renderer",
                    printMargin: "renderer",
                    fadeFoldWidgets: "renderer",
                    showFoldWidgets: "renderer",
                    displayIndentGuides: "renderer",
                    showGutter: "renderer",
                    fontSize: "renderer",
                    fontFamily: "renderer",
                    maxLines: "renderer",
                    minLines: "renderer",
                    scrollPastEnd: "renderer",
                    fixedWidthGutter: "renderer",
                    theme: "renderer",
                    hasCssTransforms: "renderer",
                    maxPixelHeight: "renderer",
                    useTextareaForIME: "renderer",
                    scrollSpeed: "$mouseHandler",
                    dragDelay: "$mouseHandler",
                    dragEnabled: "$mouseHandler",
                    focusTimeout: "$mouseHandler",
                    tooltipFollowsMouse: "$mouseHandler",
                    firstLineNumber: "session",
                    overwrite: "session",
                    newLineMode: "session",
                    useWorker: "session",
                    useSoftTabs: "session",
                    navigateWithinSoftTabs: "session",
                    tabSize: "session",
                    wrap: "session",
                    indentedSoftWrap: "session",
                    foldStyle: "session",
                    mode: "session"
                });
                var C = {
                    getText: function(e, t) {
                        return (Math.abs(e.selection.lead.row - t) || t + 1 + (t < 9 ? "Â·" : "")) + ""
                    },
                    getWidth: function(e, t, n) {
                        return Math.max(t.toString().length, (n.lastRow + 1).toString().length, 2) * n.characterWidth
                    },
                    update: function(e, t) {
                        t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER)
                    },
                    attach: function(e) {
                        e.renderer.$gutterLayer.$renderer = this, e.on("changeSelection", this.update), this.update(null, e)
                    },
                    detach: function(e) {
                        e.renderer.$gutterLayer.$renderer == this && (e.renderer.$gutterLayer.$renderer = null), e.off("changeSelection", this.update), this.update(null, e)
                    }
                };
                t.Editor = _
            }), ace.define("ace/undomanager", [], function(e, t, n) {
                "use strict";
                var r = function() {
                    this.$maxRev = 0, this.$fromUndo = !1, this.reset()
                };
                (function() {
                    this.addSession = function(e) {
                        this.$session = e
                    }, this.add = function(e, t, n) {
                        this.$fromUndo || e != this.$lastDelta && (!1 !== t && this.lastDeltas || (this.lastDeltas = [], this.$undoStack.push(this.lastDeltas), e.id = this.$rev = ++this.$maxRev), "remove" != e.action && "insert" != e.action || (this.$lastDelta = e), this.lastDeltas.push(e))
                    }, this.addSelection = function(e, t) {
                        this.selections.push({
                            value: e,
                            rev: t || this.$rev
                        })
                    }, this.startNewGroup = function() {
                        return this.lastDeltas = null, this.$rev
                    }, this.markIgnored = function(e, t) {
                        null == t && (t = this.$rev + 1);
                        for (var n = this.$undoStack, r = n.length; r--;) {
                            var i = n[r][0];
                            if (i.id <= e) break;
                            i.id < t && (i.ignore = !0)
                        }
                        this.lastDeltas = null
                    }, this.getSelection = function(e, t) {
                        for (var n = this.selections, r = n.length; r--;) {
                            var i = n[r];
                            if (i.rev < e) return t && (i = n[r + 1]), i
                        }
                    }, this.getRevision = function() {
                        return this.$rev
                    }, this.getDeltas = function(e, t) {
                        null == t && (t = this.$rev + 1);
                        for (var n = this.$undoStack, r = null, i = 0, o = n.length; o--;) {
                            var s = n[o][0];
                            if (s.id < t && !r && (r = o + 1), s.id <= e) {
                                i = o + 1;
                                break
                            }
                        }
                        return n.slice(i, r)
                    }, this.getChangedRanges = function(e, t) {
                        null == t && (t = this.$rev + 1)
                    }, this.getChangedLines = function(e, t) {
                        null == t && (t = this.$rev + 1)
                    }, this.undo = function(e, t) {
                        this.lastDeltas = null;
                        var n = this.$undoStack;
                        if (function(e, t) {
                            for (var n = t; n--;) {
                                var r = e[n];
                                if (r && !r[0].ignore) {
                                    for (; n < t - 1;) {
                                        var i = u(e[n], e[n + 1]);
                                        e[n] = i[0], e[n + 1] = i[1], n++
                                    }
                                    return !0
                                }
                            }
                        }(n, n.length)) {
                            e || (e = this.$session), this.$redoStackBaseRev !== this.$rev && this.$redoStack.length && (this.$redoStack = []), this.$fromUndo = !0;
                            var r = n.pop(),
                                i = null;
                            return r && r.length && (i = e.undoChanges(r, t), this.$redoStack.push(r), this.$syncRev()), this.$fromUndo = !1, i
                        }
                    }, this.redo = function(e, t) {
                        if (this.lastDeltas = null, e || (e = this.$session), this.$fromUndo = !0, this.$redoStackBaseRev != this.$rev) {
                            var n = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
                            ! function(e, t) {
                                for (var n = 0; n < t.length; n++)
                                    for (var r = t[n], i = 0; i < r.length; i++) g(e, r[i])
                            }(this.$redoStack, n), this.$redoStackBaseRev = this.$rev, this.$redoStack.forEach(function(e) {
                                e[0].id = ++this.$maxRev
                            }, this)
                        }
                        var r = this.$redoStack.pop(),
                            i = null;
                        return r && (i = e.redoChanges(r, t), this.$undoStack.push(r), this.$syncRev()), this.$fromUndo = !1, i
                    }, this.$syncRev = function() {
                        var e = this.$undoStack,
                            t = e[e.length - 1],
                            n = t && t[0].id || 0;
                        this.$redoStackBaseRev = n, this.$rev = n
                    }, this.reset = function() {
                        this.lastDeltas = null, this.$lastDelta = null, this.$undoStack = [], this.$redoStack = [], this.$rev = 0, this.mark = 0, this.$redoStackBaseRev = this.$rev, this.selections = []
                    }, this.canUndo = function() {
                        return this.$undoStack.length > 0
                    }, this.canRedo = function() {
                        return this.$redoStack.length > 0
                    }, this.bookmark = function(e) {
                        null == e && (e = this.$rev), this.mark = e
                    }, this.isAtBookmark = function() {
                        return this.$rev === this.mark
                    }, this.toJSON = function() {}, this.fromJSON = function() {}, this.hasUndo = this.canUndo, this.hasRedo = this.canRedo, this.isClean = this.isAtBookmark, this.markClean = this.bookmark, this.$prettyPrint = function(e) {
                        return e ? a(e) : a(this.$undoStack) + "\n---\n" + a(this.$redoStack)
                    }
                }).call(r.prototype);
                var i = e("./range").Range,
                    o = i.comparePoints;
                i.comparePoints;

                function s(e) {
                    return {
                        row: e.row,
                        column: e.column
                    }
                }

                function a(e) {
                    if (e = e || this, Array.isArray(e)) return e.map(a).join("\n");
                    var t = "";
                    return e.action ? (t = "insert" == e.action ? "+" : "-", t += "[" + e.lines + "]") : e.value && (t = Array.isArray(e.value) ? e.value.map(l).join("\n") : l(e.value)), e.start && (t += l(e)), (e.id || e.rev) && (t += "\t(" + (e.id || e.rev) + ")"), t
                }

                function l(e) {
                    return e.start.row + ":" + e.start.column + "=>" + e.end.row + ":" + e.end.column
                }

                function c(e, t) {
                    var n = "insert" == e.action,
                        r = "insert" == t.action;
                    if (n && r)
                        if (o(t.start, e.end) >= 0) d(t, e, -1);
                        else {
                            if (!(o(t.start, e.start) <= 0)) return null;
                            d(e, t, 1)
                        } else if (n && !r)
                        if (o(t.start, e.end) >= 0) d(t, e, -1);
                        else {
                            if (!(o(t.end, e.start) <= 0)) return null;
                            d(e, t, -1)
                        } else if (!n && r)
                        if (o(t.start, e.start) >= 0) d(t, e, 1);
                        else {
                            if (!(o(t.start, e.start) <= 0)) return null;
                            d(e, t, 1)
                        } else if (!n && !r)
                        if (o(t.start, e.start) >= 0) d(t, e, 1);
                        else {
                            if (!(o(t.end, e.start) <= 0)) return null;
                            d(e, t, -1)
                        }
                    return [t, e]
                }

                function u(e, t) {
                    for (var n = e.length; n--;)
                        for (var r = 0; r < t.length; r++)
                            if (!c(e[n], t[r])) {
                                for (; n < e.length;) {
                                    for (; r--;) c(t[r], e[n]);
                                    r = t.length, n++
                                }
                                return [e, t]
                            }
                    return e.selectionBefore = t.selectionBefore = e.selectionAfter = t.selectionAfter = null, [t, e]
                }

                function h(e, t) {
                    var n = "insert" == e.action,
                        r = "insert" == t.action;
                    if (n && r) o(e.start, t.start) < 0 ? d(t, e, 1) : d(e, t, 1);
                    else if (n && !r) o(e.start, t.end) >= 0 ? d(e, t, -1) : o(e.start, t.start) <= 0 ? d(t, e, 1) : (d(e, i.fromPoints(t.start, e.start), -1), d(t, e, 1));
                    else if (!n && r) o(t.start, e.end) >= 0 ? d(t, e, -1) : o(t.start, e.start) <= 0 ? d(e, t, 1) : (d(t, i.fromPoints(e.start, t.start), -1), d(e, t, 1));
                    else if (!n && !r)
                        if (o(t.start, e.end) >= 0) d(t, e, -1);
                        else {
                            var s, a;
                            if (!(o(t.end, e.start) <= 0)) return o(e.start, t.start) < 0 && (s = e, e = p(e, t.start)), o(e.end, t.end) > 0 && (a = p(e, t.end)), f(t.end, e.start, e.end, -1), a && !s && (e.lines = a.lines, e.start = a.start, e.end = a.end, a = e), [t, s, a].filter(Boolean);
                            d(e, t, -1)
                        }
                    return [t, e]
                }

                function d(e, t, n) {
                    f(e.start, t.start, t.end, n), f(e.end, t.start, t.end, n)
                }

                function f(e, t, n, r) {
                    e.row == (1 == r ? t : n).row && (e.column += r * (n.column - t.column)), e.row += r * (n.row - t.row)
                }

                function p(e, t) {
                    var n = e.lines,
                        r = e.end;
                    e.end = s(t);
                    var i = e.end.row - e.start.row,
                        o = n.splice(i, n.length),
                        a = i ? t.column : t.column - e.start.column;
                    return n.push(o[0].substring(0, a)), o[0] = o[0].substr(a), {
                        start: s(t),
                        end: r,
                        lines: o,
                        action: e.action
                    }
                }

                function g(e, t) {
                    t = function(e) {
                        return {
                            start: s(e.start),
                            end: s(e.end),
                            action: e.action,
                            lines: e.lines.slice()
                        }
                    }(t);
                    for (var n = e.length; n--;) {
                        for (var r = e[n], i = 0; i < r.length; i++) {
                            var o = h(r[i], t);
                            t = o[0], 2 != o.length && (o[2] ? (r.splice(i + 1, 1, o[1], o[2]), i++) : o[1] || (r.splice(i, 1), i--))
                        }
                        r.length || e.splice(n, 1)
                    }
                    return e
                }
                t.UndoManager = r
            }), ace.define("ace/layer/lines", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom"),
                    i = function(e, t) {
                        this.element = e, this.canvasHeight = t || 5e5, this.element.style.height = 2 * this.canvasHeight + "px", this.cells = [], this.cellCache = [], this.$offsetCoefficient = 0
                    };
                (function() {
                    this.moveContainer = function(e) {
                        r.translate(this.element, 0, -e.firstRowScreen * e.lineHeight % this.canvasHeight - e.offset * this.$offsetCoefficient)
                    }, this.pageChanged = function(e, t) {
                        return Math.floor(e.firstRowScreen * e.lineHeight / this.canvasHeight) !== Math.floor(t.firstRowScreen * t.lineHeight / this.canvasHeight)
                    }, this.computeLineTop = function(e, t, n) {
                        var r = t.firstRowScreen * t.lineHeight,
                            i = Math.floor(r / this.canvasHeight);
                        return n.documentToScreenRow(e, 0) * t.lineHeight - i * this.canvasHeight
                    }, this.computeLineHeight = function(e, t, n) {
                        return t.lineHeight * n.getRowLength(e)
                    }, this.getLength = function() {
                        return this.cells.length
                    }, this.get = function(e) {
                        return this.cells[e]
                    }, this.shift = function() {
                        this.$cacheCell(this.cells.shift())
                    }, this.pop = function() {
                        this.$cacheCell(this.cells.pop())
                    }, this.push = function(e) {
                        if (Array.isArray(e)) {
                            this.cells.push.apply(this.cells, e);
                            for (var t = r.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
                            this.element.appendChild(t)
                        } else this.cells.push(e), this.element.appendChild(e.element)
                    }, this.unshift = function(e) {
                        if (Array.isArray(e)) {
                            this.cells.unshift.apply(this.cells, e);
                            for (var t = r.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
                            this.element.firstChild ? this.element.insertBefore(t, this.element.firstChild) : this.element.appendChild(t)
                        } else this.cells.unshift(e), this.element.insertAdjacentElement("afterbegin", e.element)
                    }, this.last = function() {
                        return this.cells.length ? this.cells[this.cells.length - 1] : null
                    }, this.$cacheCell = function(e) {
                        e && (e.element.remove(), this.cellCache.push(e))
                    }, this.createCell = function(e, t, n, i) {
                        var o = this.cellCache.pop();
                        if (!o) {
                            var s = r.createElement("div");
                            i && i(s), this.element.appendChild(s), o = {
                                element: s,
                                text: "",
                                row: e
                            }
                        }
                        return o.row = e, o
                    }
                }).call(i.prototype), t.Lines = i
            }), ace.define("ace/layer/gutter", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom"),
                    i = e("../lib/oop"),
                    o = e("../lib/lang"),
                    s = e("../lib/event_emitter").EventEmitter,
                    a = e("./lines").Lines,
                    l = function(e) {
                        this.element = r.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$lines = new a(this.element), this.$lines.$offsetCoefficient = 1
                    };

                function c(e) {
                    var t = document.createTextNode("");
                    e.appendChild(t);
                    var n = r.createElement("span");
                    return e.appendChild(n), e
                }(function() {
                    i.implement(this, s), this.setSession = function(e) {
                        this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e && e.on("change", this.$updateAnnotations)
                    }, this.addGutterDecoration = function(e, t) {
                        window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
                    }, this.removeGutterDecoration = function(e, t) {
                        window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
                    }, this.setAnnotations = function(e) {
                        this.$annotations = [];
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t],
                                r = n.row,
                                i = this.$annotations[r];
                            i || (i = this.$annotations[r] = {
                                text: []
                            });
                            var s = n.text;
                            s = s ? o.escapeHTML(s) : n.html || "", -1 === i.text.indexOf(s) && i.text.push(s);
                            var a = n.type;
                            "error" == a ? i.className = " ace_error" : "warning" == a && " ace_error" != i.className ? i.className = " ace_warning" : "info" != a || i.className || (i.className = " ace_info")
                        }
                    }, this.$updateAnnotations = function(e) {
                        if (this.$annotations.length) {
                            var t = e.start.row,
                                n = e.end.row - t;
                            if (0 === n);
                            else if ("remove" == e.action) this.$annotations.splice(t, n + 1, null);
                            else {
                                var r = new Array(n + 1);
                                r.unshift(t, 1), this.$annotations.splice.apply(this.$annotations, r)
                            }
                        }
                    }, this.update = function(e) {
                        this.config = e;
                        var t = this.session,
                            n = e.firstRow,
                            r = Math.min(e.lastRow + e.gutterOffset, t.getLength() - 1);
                        this.oldLastRow = r, this.config = e, this.$lines.moveContainer(e), this.$updateCursorRow();
                        for (var i = t.getNextFoldLine(n), o = i ? i.start.row : 1 / 0, s = null, a = -1, l = n;;) {
                            if (l > o && (l = i.end.row + 1, o = (i = t.getNextFoldLine(l, i)) ? i.start.row : 1 / 0), l > r) {
                                for (; this.$lines.getLength() > a + 1;) this.$lines.pop();
                                break
                            }(s = this.$lines.get(++a)) ? s.row = l: (s = this.$lines.createCell(l, e, this.session, c), this.$lines.push(s)), this.$renderCell(s, e, i, l), l++
                        }
                        this._signal("afterRender"), this.$updateGutterWidth(e)
                    }, this.$updateGutterWidth = function(e) {
                        var t = this.session,
                            n = t.gutterRenderer || this.$renderer,
                            r = t.$firstLineNumber,
                            i = this.$lines.last() ? this.$lines.last().text : "";
                        (this.$fixedWidth || t.$useWrapMode) && (i = t.getLength() + r - 1);
                        var o = n ? n.getWidth(t, i, e) : i.toString().length * e.characterWidth,
                            s = this.$padding || this.$computePadding();
                        (o += s.left + s.right) === this.gutterWidth || isNaN(o) || (this.gutterWidth = o, this.element.parentNode.style.width = this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._signal("changeGutterWidth", o))
                    }, this.$updateCursorRow = function() {
                        if (this.$highlightGutterLine) {
                            var e = this.session.selection.getCursor();
                            this.$cursorRow !== e.row && (this.$cursorRow = e.row)
                        }
                    }, this.updateLineHighlight = function() {
                        if (this.$highlightGutterLine) {
                            var e = this.session.selection.cursor.row;
                            if (this.$cursorRow = e, !this.$cursorCell || this.$cursorCell.row != e) {
                                this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", ""));
                                var t = this.$lines.cells;
                                this.$cursorCell = null;
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    if (r.row >= this.$cursorRow) {
                                        if (r.row > this.$cursorRow) {
                                            var i = this.session.getFoldLine(this.$cursorRow);
                                            if (!(n > 0 && i && i.start.row == t[n - 1].row)) break;
                                            r = t[n - 1]
                                        }
                                        r.element.className = "ace_gutter-active-line " + r.element.className, this.$cursorCell = r;
                                        break
                                    }
                                }
                            }
                        }
                    }, this.scrollLines = function(e) {
                        var t = this.config;
                        if (this.config = e, this.$updateCursorRow(), this.$lines.pageChanged(t, e)) return this.update(e);
                        this.$lines.moveContainer(e);
                        var n = Math.min(e.lastRow + e.gutterOffset, this.session.getLength() - 1),
                            r = this.oldLastRow;
                        if (this.oldLastRow = n, !t || r < e.firstRow) return this.update(e);
                        if (n < t.firstRow) return this.update(e);
                        if (t.firstRow < e.firstRow)
                            for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) this.$lines.shift();
                        if (r > n)
                            for (i = this.session.getFoldedRowCount(n + 1, r); i > 0; i--) this.$lines.pop();
                        e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLines(e, e.firstRow, t.firstRow - 1)), n > r && this.$lines.push(this.$renderLines(e, r + 1, n)), this.updateLineHighlight(), this._signal("afterRender"), this.$updateGutterWidth(e)
                    }, this.$renderLines = function(e, t, n) {
                        for (var r = [], i = t, o = this.session.getNextFoldLine(i), s = o ? o.start.row : 1 / 0; i > s && (i = o.end.row + 1, s = (o = this.session.getNextFoldLine(i, o)) ? o.start.row : 1 / 0), !(i > n);) {
                            var a = this.$lines.createCell(i, e, this.session, c);
                            this.$renderCell(a, e, o, i), r.push(a), i++
                        }
                        return r
                    }, this.$renderCell = function(e, t, n, i) {
                        var o = e.element,
                            s = this.session,
                            a = o.childNodes[0],
                            l = o.childNodes[1],
                            c = s.$firstLineNumber,
                            u = s.$breakpoints,
                            h = s.$decorations,
                            d = s.gutterRenderer || this.$renderer,
                            f = this.$showFoldWidgets && s.foldWidgets,
                            p = n ? n.start.row : Number.MAX_VALUE,
                            g = "ace_gutter-cell ";
                        if (this.$highlightGutterLine && (i == this.$cursorRow || n && i < this.$cursorRow && i >= p && this.$cursorRow <= n.end.row) && (g += "ace_gutter-active-line ", this.$cursorCell != e && (this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "")), this.$cursorCell = e)), u[i] && (g += u[i]), h[i] && (g += h[i]), this.$annotations[i] && (g += this.$annotations[i].className), o.className != g && (o.className = g), f) {
                            var m = f[i];
                            null == m && (m = f[i] = s.getFoldWidget(i))
                        }
                        if (m) {
                            g = "ace_fold-widget ace_" + m;
                            "start" == m && i == p && i < n.end.row ? g += " ace_closed" : g += " ace_open", l.className != g && (l.className = g);
                            var v = t.lineHeight + "px";
                            r.setStyle(l.style, "height", v), r.setStyle(l.style, "display", "inline-block")
                        } else l && r.setStyle(l.style, "display", "none");
                        var y = (d ? d.getText(s, i) : i + c).toString();
                        return y !== a.data && (a.data = y), r.setStyle(e.element.style, "height", this.$lines.computeLineHeight(i, t, s) + "px"), r.setStyle(e.element.style, "top", this.$lines.computeLineTop(i, t, s) + "px"), e.text = y, e
                    }, this.$fixedWidth = !1, this.$highlightGutterLine = !0, this.$renderer = "", this.setHighlightGutterLine = function(e) {
                        this.$highlightGutterLine = e
                    }, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function(e) {
                        this.$renderer = !e && {
                            getWidth: function() {
                                return 0
                            },
                            getText: function() {
                                return ""
                            }
                        }
                    }, this.getShowLineNumbers = function() {
                        return this.$showLineNumbers
                    }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(e) {
                        e ? r.addCssClass(this.element, "ace_folding-enabled") : r.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
                    }, this.getShowFoldWidgets = function() {
                        return this.$showFoldWidgets
                    }, this.$computePadding = function() {
                        if (!this.element.firstChild) return {
                            left: 0,
                            right: 0
                        };
                        var e = r.computedStyle(this.element.firstChild);
                        return this.$padding = {}, this.$padding.left = (parseInt(e.borderLeftWidth) || 0) + (parseInt(e.paddingLeft) || 0) + 1, this.$padding.right = (parseInt(e.borderRightWidth) || 0) + (parseInt(e.paddingRight) || 0), this.$padding
                    }, this.getRegion = function(e) {
                        var t = this.$padding || this.$computePadding(),
                            n = this.element.getBoundingClientRect();
                        return e.x < t.left + n.left ? "markers" : this.$showFoldWidgets && e.x > n.right - t.right ? "foldWidgets" : void 0
                    }
                }).call(l.prototype), t.Gutter = l
            }), ace.define("ace/layer/marker", [], function(e, t, n) {
                "use strict";
                var r = e("../range").Range,
                    i = e("../lib/dom"),
                    o = function(e) {
                        this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
                    };
                (function() {
                    this.$padding = 0, this.setPadding = function(e) {
                        this.$padding = e
                    }, this.setSession = function(e) {
                        this.session = e
                    }, this.setMarkers = function(e) {
                        this.markers = e
                    }, this.elt = function(e, t) {
                        var n = -1 != this.i && this.element.childNodes[this.i];
                        n ? this.i++ : (n = document.createElement("div"), this.element.appendChild(n), this.i = -1), n.style.cssText = t, n.className = e
                    }, this.update = function(e) {
                        if (e) {
                            var t;
                            for (var n in this.config = e, this.i = 0, this.markers) {
                                var r = this.markers[n];
                                if (r.range) {
                                    var i = r.range.clipRows(e.firstRow, e.lastRow);
                                    if (!i.isEmpty())
                                        if (i = i.toScreenRange(this.session), r.renderer) {
                                            var o = this.$getTop(i.start.row, e),
                                                s = this.$padding + i.start.column * e.characterWidth;
                                            r.renderer(t, i, s, o, e)
                                        } else "fullLine" == r.type ? this.drawFullLineMarker(t, i, r.clazz, e) : "screenLine" == r.type ? this.drawScreenLineMarker(t, i, r.clazz, e) : i.isMultiLine() ? "text" == r.type ? this.drawTextMarker(t, i, r.clazz, e) : this.drawMultiLineMarker(t, i, r.clazz, e) : this.drawSingleLineMarker(t, i, r.clazz + " ace_start ace_br15", e)
                                } else r.update(t, this, this.session, e)
                            }
                            if (-1 != this.i)
                                for (; this.i < this.element.childElementCount;) this.element.removeChild(this.element.lastChild)
                        }
                    }, this.$getTop = function(e, t) {
                        return (e - t.firstRowScreen) * t.lineHeight
                    }, this.drawTextMarker = function(e, t, n, i, o) {
                        for (var s = this.session, a = t.start.row, l = t.end.row, c = a, u = 0, h = 0, d = s.getScreenLastRowColumn(c), f = new r(c, t.start.column, c, h); c <= l; c++) f.start.row = f.end.row = c, f.start.column = c == a ? t.start.column : s.getRowWrapIndent(c), f.end.column = d, u = h, h = d, d = c + 1 < l ? s.getScreenLastRowColumn(c + 1) : c == l ? 0 : t.end.column, this.drawSingleLineMarker(e, f, n + (c == a ? " ace_start" : "") + " ace_br" + ((c == a || c == a + 1 && t.start.column ? 1 : 0) | (u < h ? 2 : 0) | (h > d ? 4 : 0) | (c == l ? 8 : 0)), i, c == l ? 0 : 1, o)
                    }, this.drawMultiLineMarker = function(e, t, n, r, i) {
                        var o = this.$padding,
                            s = r.lineHeight,
                            a = this.$getTop(t.start.row, r),
                            l = o + t.start.column * r.characterWidth;
                        (i = i || "", this.session.$bidiHandler.isBidiRow(t.start.row)) ? ((c = t.clone()).end.row = c.start.row, c.end.column = this.session.getLine(c.start.row).length, this.drawBidiSingleLineMarker(e, c, n + " ace_br1 ace_start", r, null, i)) : this.elt(n + " ace_br1 ace_start", "height:" + s + "px;right:0;top:" + a + "px;left:" + l + "px;" + (i || ""));
                        if (this.session.$bidiHandler.isBidiRow(t.end.row)) {
                            var c;
                            (c = t.clone()).start.row = c.end.row, c.start.column = 0, this.drawBidiSingleLineMarker(e, c, n + " ace_br12", r, null, i)
                        } else {
                            a = this.$getTop(t.end.row, r);
                            var u = t.end.column * r.characterWidth;
                            this.elt(n + " ace_br12", "height:" + s + "px;width:" + u + "px;top:" + a + "px;left:" + o + "px;" + (i || ""))
                        }
                        if (!((s = (t.end.row - t.start.row - 1) * r.lineHeight) <= 0)) {
                            a = this.$getTop(t.start.row + 1, r);
                            var h = (t.start.column ? 1 : 0) | (t.end.column ? 0 : 8);
                            this.elt(n + (h ? " ace_br" + h : ""), "height:" + s + "px;right:0;top:" + a + "px;left:" + o + "px;" + (i || ""))
                        }
                    }, this.drawSingleLineMarker = function(e, t, n, r, i, o) {
                        if (this.session.$bidiHandler.isBidiRow(t.start.row)) return this.drawBidiSingleLineMarker(e, t, n, r, i, o);
                        var s = r.lineHeight,
                            a = (t.end.column + (i || 0) - t.start.column) * r.characterWidth,
                            l = this.$getTop(t.start.row, r),
                            c = this.$padding + t.start.column * r.characterWidth;
                        this.elt(n, "height:" + s + "px;width:" + a + "px;top:" + l + "px;left:" + c + "px;" + (o || ""))
                    }, this.drawBidiSingleLineMarker = function(e, t, n, r, i, o) {
                        var s = r.lineHeight,
                            a = this.$getTop(t.start.row, r),
                            l = this.$padding;
                        this.session.$bidiHandler.getSelections(t.start.column, t.end.column).forEach(function(e) {
                            this.elt(n, "height:" + s + "px;width:" + e.width + (i || 0) + "px;top:" + a + "px;left:" + (l + e.left) + "px;" + (o || ""))
                        }, this)
                    }, this.drawFullLineMarker = function(e, t, n, r, i) {
                        var o = this.$getTop(t.start.row, r),
                            s = r.lineHeight;
                        t.start.row != t.end.row && (s += this.$getTop(t.end.row, r) - o), this.elt(n, "height:" + s + "px;top:" + o + "px;left:0;right:0;" + (i || ""))
                    }, this.drawScreenLineMarker = function(e, t, n, r, i) {
                        var o = this.$getTop(t.start.row, r),
                            s = r.lineHeight;
                        this.elt(n, "height:" + s + "px;top:" + o + "px;left:0;right:0;" + (i || ""))
                    }
                }).call(o.prototype), t.Marker = o
            }), ace.define("ace/layer/text", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/oop"),
                    i = e("../lib/dom"),
                    o = e("../lib/lang"),
                    s = e("./lines").Lines,
                    a = e("../lib/event_emitter").EventEmitter,
                    l = function(e) {
                        this.dom = i, this.element = this.dom.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this), this.$lines = new s(this.element)
                    };
                (function() {
                    r.implement(this, a), this.EOF_CHAR = "Â¶", this.EOL_CHAR_LF = "Â¬", this.EOL_CHAR_CRLF = "Â¤", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "â€”", this.SPACE_CHAR = "Â·", this.$padding = 0, this.MAX_LINE_LENGTH = 1e4, this.$updateEolChar = function() {
                        var e = this.session.doc,
                            t = "\n" == e.getNewLineCharacter() && "windows" != e.getNewLineMode() ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
                        if (this.EOL_CHAR != t) return this.EOL_CHAR = t, !0
                    }, this.setPadding = function(e) {
                        this.$padding = e, this.element.style.margin = "0 " + e + "px"
                    }, this.getLineHeight = function() {
                        return this.$fontMetrics.$characterSize.height || 0
                    }, this.getCharacterWidth = function() {
                        return this.$fontMetrics.$characterSize.width || 0
                    }, this.$setFontMetrics = function(e) {
                        this.$fontMetrics = e, this.$fontMetrics.on("changeCharacterSize", function(e) {
                            this._signal("changeCharacterSize", e)
                        }.bind(this)), this.$pollSizeChanges()
                    }, this.checkForSizeChanges = function() {
                        this.$fontMetrics.checkForSizeChanges()
                    }, this.$pollSizeChanges = function() {
                        return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges()
                    }, this.setSession = function(e) {
                        this.session = e, e && this.$computeTabString()
                    }, this.showInvisibles = !1, this.setShowInvisibles = function(e) {
                        return this.showInvisibles != e && (this.showInvisibles = e, this.$computeTabString(), !0)
                    }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(e) {
                        return this.displayIndentGuides != e && (this.displayIndentGuides = e, this.$computeTabString(), !0)
                    }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
                        var e = this.session.getTabSize();
                        this.tabSize = e;
                        for (var t = this.$tabStrings = [0], n = 1; n < e + 1; n++) {
                            if (this.showInvisibles)(r = this.dom.createElement("span")).className = "ace_invisible ace_invisible_tab", r.textContent = o.stringRepeat(this.TAB_CHAR, n), t.push(r);
                            else t.push(this.dom.createTextNode(o.stringRepeat(" ", n), this.element))
                        }
                        if (this.displayIndentGuides) {
                            this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                            var r, i = "ace_indent-guide",
                                s = "",
                                a = "";
                            if (this.showInvisibles) {
                                i += " ace_invisible", s = " ace_invisible_space", a = " ace_invisible_tab";
                                var l = o.stringRepeat(this.SPACE_CHAR, this.tabSize),
                                    c = o.stringRepeat(this.TAB_CHAR, this.tabSize)
                            } else c = l = o.stringRepeat(" ", this.tabSize);
                            (r = this.dom.createElement("span")).className = i + s, r.textContent = l, this.$tabStrings[" "] = r, (r = this.dom.createElement("span")).className = i + a, r.textContent = c, this.$tabStrings["\t"] = r
                        }
                    }, this.updateLines = function(e, t, n) {
                        if (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) return this.update(e);
                        this.config = e;
                        for (var r = Math.max(t, e.firstRow), i = Math.min(n, e.lastRow), o = this.element.childNodes, s = 0, a = e.firstRow; a < r; a++) {
                            if (l = this.session.getFoldLine(a)) {
                                if (l.containsRow(r)) {
                                    r = l.start.row;
                                    break
                                }
                                a = l.end.row
                            }
                            s++
                        }
                        for (var l, c = !1, u = (a = r, (l = this.session.getNextFoldLine(a)) ? l.start.row : 1 / 0); a > u && (a = l.end.row + 1, u = (l = this.session.getNextFoldLine(a, l)) ? l.start.row : 1 / 0), !(a > i);) {
                            var h = o[s++];
                            if (h) {
                                this.dom.removeChildren(h), this.$renderLine(h, a, a == u && l);
                                var d = e.lineHeight * this.session.getRowLength(a) + "px";
                                h.style.height != d && (c = !0, h.style.height = d)
                            }
                            a++
                        }
                        if (c)
                            for (; s < this.$lines.cells.length;) {
                                var f = this.$lines.cells[s++];
                                f.element.style.top = this.$lines.computeLineTop(f.row, e, this.session) + "px"
                            }
                    }, this.scrollLines = function(e) {
                        var t = this.config;
                        if (this.config = e, this.$lines.pageChanged(t, e)) return this.update(e);
                        this.$lines.moveContainer(e);
                        var n = e.lastRow,
                            r = t ? t.lastRow : -1;
                        if (!t || r < e.firstRow) return this.update(e);
                        if (n < t.firstRow) return this.update(e);
                        if (!t || t.lastRow < e.firstRow) return this.update(e);
                        if (e.lastRow < t.firstRow) return this.update(e);
                        if (t.firstRow < e.firstRow)
                            for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) this.$lines.shift();
                        if (t.lastRow > e.lastRow)
                            for (i = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); i > 0; i--) this.$lines.pop();
                        e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1)), e.lastRow > t.lastRow && this.$lines.push(this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow))
                    }, this.$renderLinesFragment = function(e, t, n) {
                        for (var r = [], o = t, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0; o > a && (o = s.end.row + 1, a = (s = this.session.getNextFoldLine(o, s)) ? s.start.row : 1 / 0), !(o > n);) {
                            var l = this.$lines.createCell(o, e, this.session),
                                c = l.element;
                            this.dom.removeChildren(c), i.setStyle(c.style, "height", this.$lines.computeLineHeight(o, e, this.session) + "px"), i.setStyle(c.style, "top", this.$lines.computeLineTop(o, e, this.session) + "px"), this.$renderLine(c, o, o == a && s), this.$useLineGroups() ? c.className = "ace_line_group" : c.className = "ace_line", r.push(l), o++
                        }
                        return r
                    }, this.update = function(e) {
                        this.$lines.moveContainer(e), this.config = e;
                        for (var t = e.firstRow, n = e.lastRow, r = this.$lines; r.getLength();) r.pop();
                        r.push(this.$renderLinesFragment(e, t, n))
                    }, this.$textToken = {
                        text: !0,
                        rparen: !0,
                        lparen: !0
                    }, this.$renderToken = function(e, t, n, r) {
                        for (var i, s = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g, a = this.dom.createFragment(this.element), l = 0; i = s.exec(r);) {
                            var c = i[1],
                                u = i[2],
                                h = i[3],
                                d = i[4],
                                f = i[5];
                            if (this.showInvisibles || !u) {
                                var p = l != i.index ? r.slice(l, i.index) : "";
                                if (l = i.index + i[0].length, p && a.appendChild(this.dom.createTextNode(p, this.element)), c) {
                                    var g = this.session.getScreenTabSize(t + i.index);
                                    a.appendChild(this.$tabStrings[g].cloneNode(!0)), t += g - 1
                                } else if (u) {
                                    if (this.showInvisibles)(v = this.dom.createElement("span")).className = "ace_invisible ace_invisible_space", v.textContent = o.stringRepeat(this.SPACE_CHAR, u.length), a.appendChild(v);
                                    else a.appendChild(this.com.createTextNode(u, this.element))
                                } else if (h) {
                                    (v = this.dom.createElement("span")).className = "ace_invisible ace_invisible_space ace_invalid", v.textContent = o.stringRepeat(this.SPACE_CHAR, h.length), a.appendChild(v)
                                } else if (d) {
                                    this.showInvisibles && this.SPACE_CHAR;
                                    t += 1, (v = this.dom.createElement("span")).style.width = 2 * this.config.characterWidth + "px", v.className = this.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk", v.textContent = this.showInvisibles ? this.SPACE_CHAR : "", a.appendChild(v)
                                } else if (f) {
                                    t += 1, (v = this.dom.createElement("span")).style.width = 2 * this.config.characterWidth + "px", v.className = "ace_cjk", v.textContent = f, a.appendChild(v)
                                }
                            }
                        }
                        if (a.appendChild(this.dom.createTextNode(l ? r.slice(l) : r, this.element)), this.$textToken[n.type]) e.appendChild(a);
                        else {
                            var m = "ace_" + n.type.replace(/\./g, " ace_"),
                                v = this.dom.createElement("span");
                            "fold" == n.type && (v.style.width = n.value.length * this.config.characterWidth + "px"), v.className = m, v.appendChild(a), e.appendChild(v)
                        }
                        return t + r.length
                    }, this.renderIndentGuide = function(e, t, n) {
                        var r = t.search(this.$indentGuideRe);
                        if (r <= 0 || r >= n) return t;
                        if (" " == t[0]) {
                            for (var i = (r -= r % this.tabSize) / this.tabSize, o = 0; o < i; o++) e.appendChild(this.$tabStrings[" "].cloneNode(!0));
                            return t.substr(r)
                        }
                        if ("\t" == t[0]) {
                            for (o = 0; o < r; o++) e.appendChild(this.$tabStrings["\t"].cloneNode(!0));
                            return t.substr(r)
                        }
                        return t
                    }, this.$createLineElement = function(e) {
                        var t = this.dom.createElement("div");
                        return t.className = "ace_line", t.style.height = this.config.lineHeight + "px", t
                    }, this.$renderWrappedLine = function(e, t, n) {
                        var r = 0,
                            i = 0,
                            s = n[0],
                            a = 0,
                            l = this.$createLineElement();
                        e.appendChild(l);
                        for (var c = 0; c < t.length; c++) {
                            var u = t[c],
                                h = u.value;
                            if (0 == c && this.displayIndentGuides) {
                                if (r = h.length, !(h = this.renderIndentGuide(l, h, s))) continue;
                                r -= h.length
                            }
                            if (r + h.length < s) a = this.$renderToken(l, a, u, h), r += h.length;
                            else {
                                for (; r + h.length >= s;) a = this.$renderToken(l, a, u, h.substring(0, s - r)), h = h.substring(s - r), r = s, l = this.$createLineElement(), e.appendChild(l), l.appendChild(this.dom.createTextNode(o.stringRepeat("Â ", n.indent), this.element)), a = 0, s = n[++i] || Number.MAX_VALUE;
                                0 != h.length && (r += h.length, a = this.$renderToken(l, a, u, h))
                            }
                        }
                        n[n.length - 1] > this.MAX_LINE_LENGTH && this.$renderOverflowMessage(l, a, null, "", !0)
                    }, this.$renderSimpleLine = function(e, t) {
                        var n = 0,
                            r = t[0],
                            i = r.value;
                        this.displayIndentGuides && (i = this.renderIndentGuide(e, i)), i && (n = this.$renderToken(e, n, r, i));
                        for (var o = 1; o < t.length; o++) {
                            if (n + (i = (r = t[o]).value).length > this.MAX_LINE_LENGTH) return this.$renderOverflowMessage(e, n, r, i);
                            n = this.$renderToken(e, n, r, i)
                        }
                    }, this.$renderOverflowMessage = function(e, t, n, r, i) {
                        n && this.$renderToken(e, t, n, r.slice(0, this.MAX_LINE_LENGTH - t));
                        var o = this.dom.createElement("span");
                        o.className = "ace_inline_button ace_keyword ace_toggle_wrap", o.textContent = i ? "<hide>" : "<click to see more...>", e.appendChild(o)
                    }, this.$renderLine = function(e, t, n) {
                        if (n || 0 == n || (n = this.session.getFoldLine(t)), n) var r = this.$getFoldLineTokens(t, n);
                        else r = this.session.getTokens(t);
                        var i = e;
                        if (r.length) {
                            var o = this.session.getRowSplitData(t);
                            if (o && o.length) {
                                this.$renderWrappedLine(e, r, o);
                                i = e.lastChild
                            } else {
                                i = e;
                                this.$useLineGroups() && (i = this.$createLineElement(), e.appendChild(i)), this.$renderSimpleLine(i, r)
                            }
                        } else this.$useLineGroups() && (i = this.$createLineElement(), e.appendChild(i));
                        if (this.showInvisibles && i) {
                            n && (t = n.end.row);
                            var s = this.dom.createElement("span");
                            s.className = "ace_invisible ace_invisible_eol", s.textContent = t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, i.appendChild(s)
                        }
                    }, this.$getFoldLineTokens = function(e, t) {
                        var n = this.session,
                            r = [];
                        var i = n.getTokens(e);
                        return t.walk(function(e, t, o, s, a) {
                            null != e ? r.push({
                                type: "fold",
                                value: e
                            }) : (a && (i = n.getTokens(t)), i.length && function(e, t, n) {
                                for (var i = 0, o = 0; o + e[i].value.length < t;)
                                    if (o += e[i].value.length, ++i == e.length) return;
                                for (o != t && ((s = e[i].value.substring(t - o)).length > n - t && (s = s.substring(0, n - t)), r.push({
                                    type: e[i].type,
                                    value: s
                                }), o = t + s.length, i += 1); o < n && i < e.length;) {
                                    var s;
                                    (s = e[i].value).length + o > n ? r.push({
                                        type: e[i].type,
                                        value: s.substring(0, n - o)
                                    }) : r.push(e[i]), o += s.length, i += 1
                                }
                            }(i, s, o))
                        }, t.end.row, this.session.getLine(t.end.row).length), r
                    }, this.$useLineGroups = function() {
                        return this.session.getUseWrapMode()
                    }, this.destroy = function() {}
                }).call(l.prototype), t.Text = l
            }), ace.define("ace/layer/cursor", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/dom"),
                    i = function(e) {
                        this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = this.$updateOpacity.bind(this)
                    };
                (function() {
                    this.$updateOpacity = function(e) {
                        for (var t = this.cursors, n = t.length; n--;) r.setStyle(t[n].style, "opacity", e ? "" : "0")
                    }, this.$startCssAnimation = function() {
                        for (var e = this.cursors, t = e.length; t--;) e[t].style.animationDuration = this.blinkInterval + "ms";
                        setTimeout(function() {
                            r.addCssClass(this.element, "ace_animate-blinking")
                        }.bind(this))
                    }, this.$stopCssAnimation = function() {
                        r.removeCssClass(this.element, "ace_animate-blinking")
                    }, this.$padding = 0, this.setPadding = function(e) {
                        this.$padding = e
                    }, this.setSession = function(e) {
                        this.session = e
                    }, this.setBlinking = function(e) {
                        e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
                    }, this.setBlinkInterval = function(e) {
                        e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
                    }, this.setSmoothBlinking = function(e) {
                        e != this.smoothBlinking && (this.smoothBlinking = e, r.setCssClass(this.element, "ace_smooth-blinking", e), this.$updateCursors(!0), this.restartTimer())
                    }, this.addCursor = function() {
                        var e = r.createElement("div");
                        return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
                    }, this.removeCursor = function() {
                        if (this.cursors.length > 1) {
                            var e = this.cursors.pop();
                            return e.parentNode.removeChild(e), e
                        }
                    }, this.hideCursor = function() {
                        this.isVisible = !1, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
                    }, this.showCursor = function() {
                        this.isVisible = !0, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
                    }, this.restartTimer = function() {
                        var e = this.$updateCursors;
                        if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.$stopCssAnimation(), this.smoothBlinking && r.removeCssClass(this.element, "ace_smooth-blinking"), e(!0), this.isBlinking && this.blinkInterval && this.isVisible)
                            if (this.smoothBlinking && setTimeout(function() {
                                r.addCssClass(this.element, "ace_smooth-blinking")
                            }.bind(this)), r.HAS_CSS_ANIMATION) this.$startCssAnimation();
                            else {
                                var t = function() {
                                    this.timeoutId = setTimeout(function() {
                                        e(!1)
                                    }, .6 * this.blinkInterval)
                                }.bind(this);
                                this.intervalId = setInterval(function() {
                                    e(!0), t()
                                }, this.blinkInterval), t()
                            } else this.$stopCssAnimation()
                    }, this.getPixelPosition = function(e, t) {
                        if (!this.config || !this.session) return {
                            left: 0,
                            top: 0
                        };
                        e || (e = this.session.selection.getCursor());
                        var n = this.session.documentToScreenPosition(e);
                        return {
                            left: this.$padding + (this.session.$bidiHandler.isBidiRow(n.row, e.row) ? this.session.$bidiHandler.getPosLeft(n.column) : n.column * this.config.characterWidth),
                            top: (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight
                        }
                    }, this.isCursorInView = function(e, t) {
                        return e.top >= 0 && e.top < t.maxHeight
                    }, this.update = function(e) {
                        this.config = e;
                        var t = this.session.$selectionMarkers,
                            n = 0,
                            i = 0;
                        void 0 !== t && 0 !== t.length || (t = [{
                            cursor: null
                        }]);
                        n = 0;
                        for (var o = t.length; n < o; n++) {
                            var s = this.getPixelPosition(t[n].cursor, !0);
                            if (!((s.top > e.height + e.offset || s.top < 0) && n > 1)) {
                                var a = this.cursors[i++] || this.addCursor(),
                                    l = a.style;
                                this.drawCursor ? this.drawCursor(a, s, e, t[n], this.session) : this.isCursorInView(s, e) ? (r.setStyle(l, "display", "block"), r.translate(a, s.left, s.top), r.setStyle(l, "width", Math.round(e.characterWidth) + "px"), r.setStyle(l, "height", e.lineHeight + "px")) : r.setStyle(l, "display", "none")
                            }
                        }
                        for (; this.cursors.length > i;) this.removeCursor();
                        var c = this.session.getOverwrite();
                        this.$setOverwrite(c), this.$pixelPos = s, this.restartTimer()
                    }, this.drawCursor = null, this.$setOverwrite = function(e) {
                        e != this.overwrite && (this.overwrite = e, e ? r.addCssClass(this.element, "ace_overwrite-cursors") : r.removeCssClass(this.element, "ace_overwrite-cursors"))
                    }, this.destroy = function() {
                        clearInterval(this.intervalId), clearTimeout(this.timeoutId)
                    }
                }).call(i.prototype), t.Cursor = i
            }), ace.define("ace/scrollbar", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./lib/dom"),
                    o = e("./lib/event"),
                    s = e("./lib/event_emitter").EventEmitter,
                    a = function(e) {
                        this.element = i.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.inner.textContent = "Â ", this.element.appendChild(this.inner), e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, o.addListener(this.element, "scroll", this.onScroll.bind(this)), o.addListener(this.element, "mousedown", o.preventDefault)
                    };
                (function() {
                    r.implement(this, s), this.setVisible = function(e) {
                        this.element.style.display = e ? "" : "none", this.isVisible = e, this.coeff = 1
                    }
                }).call(a.prototype);
                var l = function(e, t) {
                    a.call(this, e), this.scrollTop = 0, this.scrollHeight = 0, t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.$minWidth = 0
                };
                r.inherits(l, a),
                    function() {
                        this.classSuffix = "-v", this.onScroll = function() {
                            if (!this.skipEvent) {
                                if (this.scrollTop = this.element.scrollTop, 1 != this.coeff) {
                                    var e = this.element.clientHeight / this.scrollHeight;
                                    this.scrollTop = this.scrollTop * (1 - e) / (this.coeff - e)
                                }
                                this._emit("scroll", {
                                    data: this.scrollTop
                                })
                            }
                            this.skipEvent = !1
                        }, this.getWidth = function() {
                            return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0)
                        }, this.setHeight = function(e) {
                            this.element.style.height = e + "px"
                        }, this.setInnerHeight = this.setScrollHeight = function(e) {
                            this.scrollHeight = e, e > 32768 ? (this.coeff = 32768 / e, e = 32768) : 1 != this.coeff && (this.coeff = 1), this.inner.style.height = e + "px"
                        }, this.setScrollTop = function(e) {
                            this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = e, this.element.scrollTop = e * this.coeff)
                        }
                    }.call(l.prototype);
                var c = function(e, t) {
                    a.call(this, e), this.scrollLeft = 0, this.height = t.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px"
                };
                r.inherits(c, a),
                    function() {
                        this.classSuffix = "-h", this.onScroll = function() {
                            this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
                                data: this.scrollLeft
                            })), this.skipEvent = !1
                        }, this.getHeight = function() {
                            return this.isVisible ? this.height : 0
                        }, this.setWidth = function(e) {
                            this.element.style.width = e + "px"
                        }, this.setInnerWidth = function(e) {
                            this.inner.style.width = e + "px"
                        }, this.setScrollWidth = function(e) {
                            this.inner.style.width = e + "px"
                        }, this.setScrollLeft = function(e) {
                            this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e)
                        }
                    }.call(c.prototype), t.ScrollBar = l, t.ScrollBarV = l, t.ScrollBarH = c, t.VScrollBar = l, t.HScrollBar = c
            }), ace.define("ace/renderloop", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/event"),
                    i = function(e, t) {
                        this.onRender = e, this.pending = !1, this.changes = 0, this.$recursionLimit = 2, this.window = t || window;
                        var n = this;
                        this._flush = function(e) {
                            n.pending = !1;
                            var t = n.changes;
                            if (t && (r.blockIdle(100), n.changes = 0, n.onRender(t)), n.changes) {
                                if (n.$recursionLimit-- < 0) return;
                                n.schedule()
                            } else n.$recursionLimit = 2
                        }
                    };
                (function() {
                    this.schedule = function(e) {
                        this.changes = this.changes | e, this.changes && !this.pending && (r.nextFrame(this._flush), this.pending = !0)
                    }, this.clear = function(e) {
                        var t = this.changes;
                        return this.changes = 0, t
                    }
                }).call(i.prototype), t.RenderLoop = i
            }), ace.define("ace/layer/font_metrics", [], function(e, t, n) {
                var r = e("../lib/oop"),
                    i = e("../lib/dom"),
                    o = e("../lib/lang"),
                    s = e("../lib/event"),
                    a = e("../lib/useragent"),
                    l = e("../lib/event_emitter").EventEmitter,
                    c = "function" == typeof ResizeObserver,
                    u = 200,
                    h = t.FontMetrics = function(e) {
                        this.el = i.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = i.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = i.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e.appendChild(this.el), this.$measureNode.innerHTML = o.stringRepeat("X", 256), this.$characterSize = {
                            width: 0,
                            height: 0
                        }, c ? this.$addObserver() : this.checkForSizeChanges()
                    };
                (function() {
                    r.implement(this, l), this.$characterSize = {
                        width: 0,
                        height: 0
                    }, this.$setMeasureNodeStyles = function(e, t) {
                        e.width = e.height = "auto", e.left = e.top = "0px", e.visibility = "hidden", e.position = "absolute", e.whiteSpace = "pre", a.isIE < 8 ? e["font-family"] = "inherit" : e.font = "inherit", e.overflow = t ? "hidden" : "visible"
                    }, this.checkForSizeChanges = function(e) {
                        if (void 0 === e && (e = this.$measureSizes()), e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                            this.$measureNode.style.fontWeight = "bold";
                            var t = this.$measureSizes();
                            this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.charSizes = Object.create(null), this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {
                                data: e
                            })
                        }
                    }, this.$addObserver = function() {
                        var e = this;
                        this.$observer = new window.ResizeObserver(function(t) {
                            var n = t[0].contentRect;
                            e.checkForSizeChanges({
                                height: n.height,
                                width: n.width / 256
                            })
                        }), this.$observer.observe(this.$measureNode)
                    }, this.$pollSizeChanges = function() {
                        if (this.$pollSizeChangesTimer || this.$observer) return this.$pollSizeChangesTimer;
                        var e = this;
                        return this.$pollSizeChangesTimer = s.onIdle(function t() {
                            e.checkForSizeChanges(), s.onIdle(t, 500)
                        }, 500)
                    }, this.setPolling = function(e) {
                        e ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0)
                    }, this.$measureSizes = function(e) {
                        var t = {
                            height: (e || this.$measureNode).clientHeight,
                            width: (e || this.$measureNode).clientWidth / 256
                        };
                        return 0 === t.width || 0 === t.height ? null : t
                    }, this.$measureCharWidth = function(e) {
                        return this.$main.innerHTML = o.stringRepeat(e, 256), this.$main.getBoundingClientRect().width / 256
                    }, this.getCharacterWidth = function(e) {
                        var t = this.charSizes[e];
                        return void 0 === t && (t = this.charSizes[e] = this.$measureCharWidth(e) / this.$characterSize.width), t
                    }, this.destroy = function() {
                        clearInterval(this.$pollSizeChangesTimer), this.$observer && this.$observer.disconnect(), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
                    }, this.$getZoom = function e(t) {
                        return t ? (window.getComputedStyle(t).zoom || 1) * e(t.parentElement) : 1
                    }, this.$initTransformMeasureNodes = function() {
                        var e = function(e, t) {
                            return ["div", {
                                style: "position: absolute;top:" + e + "px;left:" + t + "px;"
                            }]
                        };
                        this.els = i.buildDom([e(0, 0), e(u, 0), e(0, u), e(u, u)], this.el)
                    }, this.transformCoordinates = function(e, t) {
                        e && (e = o(1 / this.$getZoom(this.el), e));

                        function n(e, t, n) {
                            var r = e[1] * t[0] - e[0] * t[1];
                            return [(-t[1] * n[0] + t[0] * n[1]) / r, (+e[1] * n[0] - e[0] * n[1]) / r]
                        }

                        function r(e, t) {
                            return [e[0] - t[0], e[1] - t[1]]
                        }

                        function i(e, t) {
                            return [e[0] + t[0], e[1] + t[1]]
                        }

                        function o(e, t) {
                            return [e * t[0], e * t[1]]
                        }

                        function s(e) {
                            var t = e.getBoundingClientRect();
                            return [t.left, t.top]
                        }
                        this.els || this.$initTransformMeasureNodes();
                        var a = s(this.els[0]),
                            l = s(this.els[1]),
                            c = s(this.els[2]),
                            h = s(this.els[3]),
                            d = n(r(h, l), r(h, c), r(i(l, c), i(h, a))),
                            f = o(1 + d[0], r(l, a)),
                            p = o(1 + d[1], r(c, a));
                        if (t) {
                            var g = t,
                                m = d[0] * g[0] / u + d[1] * g[1] / u + 1,
                                v = i(o(g[0], f), o(g[1], p));
                            return i(o(1 / m / u, v), a)
                        }
                        var y = r(e, a),
                            b = n(r(f, o(d[0], y)), r(p, o(d[1], y)), y);
                        return o(u, b)
                    }
                }).call(h.prototype)
            }), ace.define("ace/virtual_renderer", [], function(e, t, n) {
                "use strict";
                var r = e("./lib/oop"),
                    i = e("./lib/dom"),
                    o = e("./config"),
                    s = e("./layer/gutter").Gutter,
                    a = e("./layer/marker").Marker,
                    l = e("./layer/text").Text,
                    c = e("./layer/cursor").Cursor,
                    u = e("./scrollbar").HScrollBar,
                    h = e("./scrollbar").VScrollBar,
                    d = e("./renderloop").RenderLoop,
                    f = e("./layer/font_metrics").FontMetrics,
                    p = e("./lib/event_emitter").EventEmitter,
                    g = '.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;perspective: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}',
                    m = e("./lib/useragent"),
                    v = m.isIE;
                i.importCssString(g, "ace_editor.css");
                var y = function(e, t) {
                    var n = this;
                    this.container = e || i.createElement("div"), i.addCssClass(this.container, "ace_editor"), i.HI_DPI && i.addCssClass(this.container, "ace_hidpi"), this.setTheme(t), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.$gutter.setAttribute("aria-hidden", !0), this.scroller = i.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new s(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new a(this.content);
                    var r = this.$textLayer = new l(this.content);
                    this.canvas = r.element, this.$markerFront = new a(this.content), this.$cursorLayer = new c(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new h(this.container, this), this.scrollBarH = new u(this.container, this), this.scrollBarV.addEventListener("scroll", function(e) {
                        n.$scrollAnimation || n.session.setScrollTop(e.data - n.scrollMargin.top)
                    }), this.scrollBarH.addEventListener("scroll", function(e) {
                        n.$scrollAnimation || n.session.setScrollLeft(e.data - n.scrollMargin.left)
                    }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
                        row: 0,
                        column: 0
                    }, this.$fontMetrics = new f(this.container), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.addEventListener("changeCharacterSize", function(e) {
                        n.updateCharacterSize(), n.onResize(!0, n.gutterWidth, n.$size.width, n.$size.height), n._signal("changeCharacterSize", e)
                    }), this.$size = {
                        width: 0,
                        height: 0,
                        scrollerHeight: 0,
                        scrollerWidth: 0,
                        $dirty: !0
                    }, this.layerConfig = {
                        width: 1,
                        padding: 0,
                        firstRow: 0,
                        firstRowScreen: 0,
                        lastRow: 0,
                        lineHeight: 0,
                        characterWidth: 0,
                        minHeight: 1,
                        maxHeight: 1,
                        offset: 0,
                        height: 1,
                        gutterOffset: 1
                    }, this.scrollMargin = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        v: 0,
                        h: 0
                    }, this.margin = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        v: 0,
                        h: 0
                    }, this.$keepTextAreaAtCursor = !m.isIOS, this.$loop = new d(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), o.resetOptions(this), o._signal("renderer", this)
                };
                (function() {
                    this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, r.implement(this, p), this.updateCharacterSize = function() {
                        this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
                    }, this.setSession = function(e) {
                        this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e, e && this.scrollMargin.top && e.getScrollTop() <= 0 && e.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), e && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode))
                    }, this.updateLines = function(e, t, n) {
                        if (void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {
                            firstRow: e,
                            lastRow: t
                        }, this.$changedLines.lastRow < this.layerConfig.firstRow) {
                            if (!n) return;
                            this.$changedLines.lastRow = this.layerConfig.lastRow
                        }
                        this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES)
                    }, this.onChangeNewLineMode = function() {
                        this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar(), this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)
                    }, this.onChangeTabSize = function() {
                        this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
                    }, this.updateText = function() {
                        this.$loop.schedule(this.CHANGE_TEXT)
                    }, this.updateFull = function(e) {
                        e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
                    }, this.updateFontSize = function() {
                        this.$textLayer.checkForSizeChanges()
                    }, this.$changes = 0, this.$updateSizeAsync = function() {
                        this.$loop.pending ? this.$size.$dirty = !0 : this.onResize()
                    }, this.onResize = function(e, t, n, r) {
                        if (!(this.resizing > 2)) {
                            this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
                            var i = this.container;
                            r || (r = i.clientHeight || i.scrollHeight), n || (n = i.clientWidth || i.scrollWidth);
                            var o = this.$updateCachedSize(e, t, n, r);
                            if (!this.$size.scrollerHeight || !n && !r) return this.resizing = 0;
                            e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(o | this.$changes, !0) : this.$loop.schedule(o | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
                        }
                    }, this.$updateCachedSize = function(e, t, n, r) {
                        r -= this.$extraHeight || 0;
                        var o = 0,
                            s = this.$size,
                            a = {
                                width: s.width,
                                height: s.height,
                                scrollerHeight: s.scrollerHeight,
                                scrollerWidth: s.scrollerWidth
                            };
                        if (r && (e || s.height != r) && (s.height = r, o |= this.CHANGE_SIZE, s.scrollerHeight = s.height, this.$horizScroll && (s.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", o |= this.CHANGE_SCROLL), n && (e || s.width != n)) {
                            o |= this.CHANGE_SIZE, s.width = n, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, i.setStyle(this.scrollBarH.element.style, "left", t + "px"), i.setStyle(this.scroller.style, "left", t + this.margin.left + "px"), s.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth() - this.margin.h), i.setStyle(this.$gutter.style, "left", this.margin.left + "px");
                            var l = this.scrollBarV.getWidth() + "px";
                            i.setStyle(this.scrollBarH.element.style, "right", l), i.setStyle(this.scroller.style, "right", l), i.setStyle(this.scroller.style, "bottom", this.scrollBarH.getHeight()), (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (o |= this.CHANGE_FULL)
                        }
                        return s.$dirty = !n || !r, o && this._signal("resize", a), o
                    }, this.onGutterResize = function(e) {
                        var t = this.$showGutter ? e : 0;
                        t != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, t, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : this.$computeLayerConfig()
                    }, this.adjustWrapLimit = function() {
                        var e = this.$size.scrollerWidth - 2 * this.$padding,
                            t = Math.floor(e / this.characterWidth);
                        return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
                    }, this.setAnimatedScroll = function(e) {
                        this.setOption("animatedScroll", e)
                    }, this.getAnimatedScroll = function() {
                        return this.$animatedScroll
                    }, this.setShowInvisibles = function(e) {
                        this.setOption("showInvisibles", e), this.session.$bidiHandler.setShowInvisibles(e)
                    }, this.getShowInvisibles = function() {
                        return this.getOption("showInvisibles")
                    }, this.getDisplayIndentGuides = function() {
                        return this.getOption("displayIndentGuides")
                    }, this.setDisplayIndentGuides = function(e) {
                        this.setOption("displayIndentGuides", e)
                    }, this.setShowPrintMargin = function(e) {
                        this.setOption("showPrintMargin", e)
                    }, this.getShowPrintMargin = function() {
                        return this.getOption("showPrintMargin")
                    }, this.setPrintMarginColumn = function(e) {
                        this.setOption("printMarginColumn", e)
                    }, this.getPrintMarginColumn = function() {
                        return this.getOption("printMarginColumn")
                    }, this.getShowGutter = function() {
                        return this.getOption("showGutter")
                    }, this.setShowGutter = function(e) {
                        return this.setOption("showGutter", e)
                    }, this.getFadeFoldWidgets = function() {
                        return this.getOption("fadeFoldWidgets")
                    }, this.setFadeFoldWidgets = function(e) {
                        this.setOption("fadeFoldWidgets", e)
                    }, this.setHighlightGutterLine = function(e) {
                        this.setOption("highlightGutterLine", e)
                    }, this.getHighlightGutterLine = function() {
                        return this.getOption("highlightGutterLine")
                    }, this.$updatePrintMargin = function() {
                        if (this.$showPrintMargin || this.$printMarginEl) {
                            if (!this.$printMarginEl) {
                                var e = i.createElement("div");
                                e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
                            }
                            var t = this.$printMarginEl.style;
                            t.left = Math.round(this.characterWidth * this.$printMarginColumn + this.$padding) + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
                        }
                    }, this.getContainerElement = function() {
                        return this.container
                    }, this.getMouseEventTarget = function() {
                        return this.scroller
                    }, this.getTextAreaContainer = function() {
                        return this.container
                    }, this.$moveTextAreaToCursor = function() {
                        if (!this.$isMousePressed) {
                            var e = this.textarea.style,
                                t = this.$composition;
                            if (this.$keepTextAreaAtCursor || t) {
                                var n = this.$cursorLayer.$pixelPos;
                                if (n) {
                                    t && t.markerRange && (n = this.$cursorLayer.getPixelPosition(t.markerRange.start, !0));
                                    var r = this.layerConfig,
                                        o = n.top,
                                        s = n.left;
                                    o -= r.offset;
                                    var a = t && t.useTextareaForIME ? this.lineHeight : v ? 0 : 1;
                                    if (o < 0 || o > r.height - a) i.translate(this.textarea, 0, 0);
                                    else {
                                        var l = 1;
                                        if (t)
                                            if (t.useTextareaForIME) {
                                                var c = this.textarea.value;
                                                l = this.characterWidth * this.session.$getStringScreenWidth(c)[0], a += 2
                                            } else o += this.lineHeight + 2;
                                        else o += this.lineHeight;
                                        (s -= this.scrollLeft) > this.$size.scrollerWidth - l && (s = this.$size.scrollerWidth - l), s += this.gutterWidth + this.margin.left, i.setStyle(e, "height", a + "px"), i.setStyle(e, "width", l + "px"), i.translate(this.textarea, Math.min(s, this.$size.scrollerWidth - l), Math.min(o, this.$size.height - a))
                                    }
                                }
                            } else i.translate(this.textarea, -100, 0)
                        }
                    }, this.getFirstVisibleRow = function() {
                        return this.layerConfig.firstRow
                    }, this.getFirstFullyVisibleRow = function() {
                        return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
                    }, this.getLastFullyVisibleRow = function() {
                        var e = this.layerConfig,
                            t = e.lastRow;
                        return this.session.documentToScreenRow(t, 0) * e.lineHeight - this.session.getScrollTop() > e.height - e.lineHeight ? t - 1 : t
                    }, this.getLastVisibleRow = function() {
                        return this.layerConfig.lastRow
                    }, this.$padding = null, this.setPadding = function(e) {
                        this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
                    }, this.setScrollMargin = function(e, t, n, r) {
                        var i = this.scrollMargin;
                        i.top = 0 | e, i.bottom = 0 | t, i.right = 0 | r, i.left = 0 | n, i.v = i.top + i.bottom, i.h = i.left + i.right, i.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-i.top), this.updateFull()
                    }, this.setMargin = function(e, t, n, r) {
                        var i = this.margin;
                        i.top = 0 | e, i.bottom = 0 | t, i.right = 0 | r, i.left = 0 | n, i.v = i.top + i.bottom, i.h = i.left + i.right, this.$updateCachedSize(!0, this.gutterWidth, this.$size.width, this.$size.height), this.updateFull()
                    }, this.getHScrollBarAlwaysVisible = function() {
                        return this.$hScrollBarAlwaysVisible
                    }, this.setHScrollBarAlwaysVisible = function(e) {
                        this.setOption("hScrollBarAlwaysVisible", e)
                    }, this.getVScrollBarAlwaysVisible = function() {
                        return this.$vScrollBarAlwaysVisible
                    }, this.setVScrollBarAlwaysVisible = function(e) {
                        this.setOption("vScrollBarAlwaysVisible", e)
                    }, this.$updateScrollBarV = function() {
                        var e = this.layerConfig.maxHeight,
                            t = this.$size.scrollerHeight;
                        !this.$maxLines && this.$scrollPastEnd && (e -= (t - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e - t && (e = this.scrollTop + t, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
                    }, this.$updateScrollBarH = function() {
                        this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
                    }, this.$frozen = !1, this.freeze = function() {
                        this.$frozen = !0
                    }, this.unfreeze = function() {
                        this.$frozen = !1
                    }, this.$renderChanges = function(e, t) {
                        if (this.$changes && (e |= this.$changes, this.$changes = 0), this.session && this.container.offsetWidth && !this.$frozen && (e || t)) {
                            if (this.$size.$dirty) return this.$changes |= e, this.onResize(!0);
                            this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender"), this.session && this.session.$bidiHandler && this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
                            var n = this.layerConfig;
                            if (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
                                if (e |= this.$computeLayerConfig() | this.$loop.clear(), n.firstRow != this.layerConfig.firstRow && n.firstRowScreen == this.layerConfig.firstRowScreen) {
                                    var r = this.scrollTop + (n.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                                    r > 0 && (this.scrollTop = r, e |= this.CHANGE_SCROLL, e |= this.$computeLayerConfig() | this.$loop.clear())
                                }
                                n = this.layerConfig, this.$updateScrollBarV(), e & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), i.translate(this.content, -this.scrollLeft, -n.offset);
                                var o = n.width + 2 * this.$padding + "px",
                                    s = n.minHeight + "px";
                                i.setStyle(this.content.style, "width", o), i.setStyle(this.content.style, "height", s)
                            }
                            if (e & this.CHANGE_H_SCROLL && (i.translate(this.content, -this.scrollLeft, -n.offset), this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL) return this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender");
                            if (e & this.CHANGE_SCROLL) return e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(n) : this.$textLayer.scrollLines(n), this.$showGutter && (e & this.CHANGE_GUTTER || e & this.CHANGE_LINES ? this.$gutterLayer.update(n) : this.$gutterLayer.scrollLines(n)), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender");
                            e & this.CHANGE_TEXT ? (this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(n) : e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER ? this.$showGutter && this.$gutterLayer.update(n) : e & this.CHANGE_CURSOR && this.$highlightGutterLine && this.$gutterLayer.updateLineHighlight(n), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(n), this.$moveTextAreaToCursor()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(n), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(n), this._signal("afterRender")
                        } else this.$changes |= e
                    }, this.$autosize = function() {
                        var e = this.session.getScreenLength() * this.lineHeight,
                            t = this.$maxLines * this.lineHeight,
                            n = Math.min(t, Math.max((this.$minLines || 1) * this.lineHeight, e)) + this.scrollMargin.v + (this.$extraHeight || 0);
                        this.$horizScroll && (n += this.scrollBarH.getHeight()), this.$maxPixelHeight && n > this.$maxPixelHeight && (n = this.$maxPixelHeight);
                        var r = !(n <= 2 * this.lineHeight) && e > t;
                        if (n != this.desiredHeight || this.$size.height != this.desiredHeight || r != this.$vScroll) {
                            r != this.$vScroll && (this.$vScroll = r, this.scrollBarV.setVisible(r));
                            var i = this.container.clientWidth;
                            this.container.style.height = n + "px", this.$updateCachedSize(!0, this.$gutterWidth, i, n), this.desiredHeight = n, this._signal("autosize")
                        }
                    }, this.$computeLayerConfig = function() {
                        var e = this.session,
                            t = this.$size,
                            n = t.height <= 2 * this.lineHeight,
                            r = this.session.getScreenLength() * this.lineHeight,
                            i = this.$getLongestLine(),
                            o = !n && (this.$hScrollBarAlwaysVisible || t.scrollerWidth - i - 2 * this.$padding < 0),
                            s = this.$horizScroll !== o;
                        s && (this.$horizScroll = o, this.scrollBarH.setVisible(o));
                        var a = this.$vScroll;
                        this.$maxLines && this.lineHeight > 1 && this.$autosize();
                        var l = t.scrollerHeight + this.lineHeight,
                            c = !this.$maxLines && this.$scrollPastEnd ? (t.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
                        r += c;
                        var u = this.scrollMargin;
                        this.session.setScrollTop(Math.max(-u.top, Math.min(this.scrollTop, r - t.scrollerHeight + u.bottom))), this.session.setScrollLeft(Math.max(-u.left, Math.min(this.scrollLeft, i + 2 * this.$padding - t.scrollerWidth + u.right)));
                        var h = !n && (this.$vScrollBarAlwaysVisible || t.scrollerHeight - r + c < 0 || this.scrollTop > u.top),
                            d = a !== h;
                        d && (this.$vScroll = h, this.scrollBarV.setVisible(h));
                        var f, p, g = this.scrollTop % this.lineHeight,
                            m = Math.ceil(l / this.lineHeight) - 1,
                            v = Math.max(0, Math.round((this.scrollTop - g) / this.lineHeight)),
                            y = v + m,
                            b = this.lineHeight;
                        v = e.screenToDocumentRow(v, 0);
                        var w = e.getFoldLine(v);
                        w && (v = w.start.row), f = e.documentToScreenRow(v, 0), p = e.getRowLength(v) * b, y = Math.min(e.screenToDocumentRow(y, 0), e.getLength() - 1), l = t.scrollerHeight + e.getRowLength(y) * b + p, g = this.scrollTop - f * b;
                        var _ = 0;
                        return (this.layerConfig.width != i || s) && (_ = this.CHANGE_H_SCROLL), (s || d) && (_ |= this.$updateCachedSize(!0, this.gutterWidth, t.width, t.height), this._signal("scrollbarVisibilityChanged"), d && (i = this.$getLongestLine())), this.layerConfig = {
                            width: i,
                            padding: this.$padding,
                            firstRow: v,
                            firstRowScreen: f,
                            lastRow: y,
                            lineHeight: b,
                            characterWidth: this.characterWidth,
                            minHeight: l,
                            maxHeight: r,
                            offset: g,
                            gutterOffset: b ? Math.max(0, Math.ceil((g + t.height - t.scrollerHeight) / b)) : 0,
                            height: this.$size.scrollerHeight
                        }, this.session.$bidiHandler && this.session.$bidiHandler.setContentWidth(i - this.$padding), _
                    }, this.$updateLines = function() {
                        if (this.$changedLines) {
                            var e = this.$changedLines.firstRow,
                                t = this.$changedLines.lastRow;
                            this.$changedLines = null;
                            var n = this.layerConfig;
                            if (!(e > n.lastRow + 1 || t < n.firstRow)) return t === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(n), void this.$textLayer.update(n)) : (this.$textLayer.updateLines(n, e, t), !0)
                        }
                    }, this.$getLongestLine = function() {
                        var e = this.session.getScreenWidth();
                        return this.showInvisibles && !this.session.$useWrapMode && (e += 1), this.$textLayer && e > this.$textLayer.MAX_LINE_LENGTH && (e = this.$textLayer.MAX_LINE_LENGTH + 30), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
                    }, this.updateFrontMarkers = function() {
                        this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
                    }, this.updateBackMarkers = function() {
                        this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
                    }, this.addGutterDecoration = function(e, t) {
                        this.$gutterLayer.addGutterDecoration(e, t)
                    }, this.removeGutterDecoration = function(e, t) {
                        this.$gutterLayer.removeGutterDecoration(e, t)
                    }, this.updateBreakpoints = function(e) {
                        this.$loop.schedule(this.CHANGE_GUTTER)
                    }, this.setAnnotations = function(e) {
                        this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
                    }, this.updateCursor = function() {
                        this.$loop.schedule(this.CHANGE_CURSOR)
                    }, this.hideCursor = function() {
                        this.$cursorLayer.hideCursor()
                    }, this.showCursor = function() {
                        this.$cursorLayer.showCursor()
                    }, this.scrollSelectionIntoView = function(e, t, n) {
                        this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n)
                    }, this.scrollCursorIntoView = function(e, t, n) {
                        if (0 !== this.$size.scrollerHeight) {
                            var r = this.$cursorLayer.getPixelPosition(e),
                                i = r.left,
                                o = r.top,
                                s = n && n.top || 0,
                                a = n && n.bottom || 0,
                                l = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
                            l + s > o ? (t && l + s > o + this.lineHeight && (o -= t * this.$size.scrollerHeight), 0 === o && (o = -this.scrollMargin.top), this.session.setScrollTop(o)) : l + this.$size.scrollerHeight - a < o + this.lineHeight && (t && l + this.$size.scrollerHeight - a < o - this.lineHeight && (o += t * this.$size.scrollerHeight), this.session.setScrollTop(o + this.lineHeight + a - this.$size.scrollerHeight));
                            var c = this.scrollLeft;
                            c > i ? (i < this.$padding + 2 * this.layerConfig.characterWidth && (i = -this.scrollMargin.left), this.session.setScrollLeft(i)) : c + this.$size.scrollerWidth < i + this.characterWidth ? this.session.setScrollLeft(Math.round(i + this.characterWidth - this.$size.scrollerWidth)) : c <= this.$padding && i - c < this.characterWidth && this.session.setScrollLeft(0)
                        }
                    }, this.getScrollTop = function() {
                        return this.session.getScrollTop()
                    }, this.getScrollLeft = function() {
                        return this.session.getScrollLeft()
                    }, this.getScrollTopRow = function() {
                        return this.scrollTop / this.lineHeight
                    }, this.getScrollBottomRow = function() {
                        return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
                    }, this.scrollToRow = function(e) {
                        this.session.setScrollTop(e * this.lineHeight)
                    }, this.alignCursor = function(e, t) {
                        "number" == typeof e && (e = {
                            row: e,
                            column: 0
                        });
                        var n = this.$cursorLayer.getPixelPosition(e),
                            r = this.$size.scrollerHeight - this.lineHeight,
                            i = n.top - r * (t || 0);
                        return this.session.setScrollTop(i), i
                    }, this.STEPS = 8, this.$calcSteps = function(e, t) {
                        var n, r, i = 0,
                            o = this.STEPS,
                            s = [];
                        for (i = 0; i < o; ++i) s.push((n = i / this.STEPS, r = e, (t - e) * (Math.pow(n - 1, 3) + 1) + r));
                        return s
                    }, this.scrollToLine = function(e, t, n, r) {
                        var i = this.$cursorLayer.getPixelPosition({
                            row: e,
                            column: 0
                        }).top;
                        t && (i -= this.$size.scrollerHeight / 2);
                        var o = this.scrollTop;
                        this.session.setScrollTop(i), !1 !== n && this.animateScrolling(o, r)
                    }, this.animateScrolling = function(e, t) {
                        var n = this.scrollTop;
                        if (this.$animatedScroll) {
                            var r = this;
                            if (e != n) {
                                if (this.$scrollAnimation) {
                                    var i = this.$scrollAnimation.steps;
                                    if (i.length && (e = i[0]) == n) return
                                }
                                var o = r.$calcSteps(e, n);
                                this.$scrollAnimation = {
                                    from: e,
                                    to: n,
                                    steps: o
                                }, clearInterval(this.$timer), r.session.setScrollTop(o.shift()), r.session.$scrollTop = n, this.$timer = setInterval(function() {
                                    o.length ? (r.session.setScrollTop(o.shift()), r.session.$scrollTop = n) : null != n ? (r.session.$scrollTop = -1, r.session.setScrollTop(n), n = null) : (r.$timer = clearInterval(r.$timer), r.$scrollAnimation = null, t && t())
                                }, 10)
                            }
                        }
                    }, this.scrollToY = function(e) {
                        this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
                    }, this.scrollToX = function(e) {
                        this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
                    }, this.scrollTo = function(e, t) {
                        this.session.setScrollTop(t), this.session.setScrollLeft(t)
                    }, this.scrollBy = function(e, t) {
                        t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
                    }, this.isScrollableBy = function(e, t) {
                        return t < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top || (t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom || (e < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left || (e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right || void 0)))
                    }, this.pixelToScreenCoordinates = function(e, t) {
                        var n;
                        if (this.$hasCssTransforms) {
                            n = {
                                top: 0,
                                left: 0
                            };
                            var r = this.$fontMetrics.transformCoordinates([e, t]);
                            e = r[1] - this.gutterWidth - this.margin.left, t = r[0]
                        } else n = this.scroller.getBoundingClientRect();
                        var i = e + this.scrollLeft - n.left - this.$padding,
                            o = i / this.characterWidth,
                            s = Math.floor((t + this.scrollTop - n.top) / this.lineHeight),
                            a = this.$blockCursor ? Math.floor(o) : Math.round(o);
                        return {
                            row: s,
                            column: a,
                            side: o - a > 0 ? 1 : -1,
                            offsetX: i
                        }
                    }, this.screenToTextCoordinates = function(e, t) {
                        var n;
                        if (this.$hasCssTransforms) {
                            n = {
                                top: 0,
                                left: 0
                            };
                            var r = this.$fontMetrics.transformCoordinates([e, t]);
                            e = r[1] - this.gutterWidth - this.margin.left, t = r[0]
                        } else n = this.scroller.getBoundingClientRect();
                        var i = e + this.scrollLeft - n.left - this.$padding,
                            o = i / this.characterWidth,
                            s = this.$blockCursor ? Math.floor(o) : Math.round(o),
                            a = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
                        return this.session.screenToDocumentPosition(a, Math.max(s, 0), i)
                    }, this.textToScreenCoordinates = function(e, t) {
                        var n = this.scroller.getBoundingClientRect(),
                            r = this.session.documentToScreenPosition(e, t),
                            i = this.$padding + (this.session.$bidiHandler.isBidiRow(r.row, e) ? this.session.$bidiHandler.getPosLeft(r.column) : Math.round(r.column * this.characterWidth)),
                            o = r.row * this.lineHeight;
                        return {
                            pageX: n.left + i - this.scrollLeft,
                            pageY: n.top + o - this.scrollTop
                        }
                    }, this.visualizeFocus = function() {
                        i.addCssClass(this.container, "ace_focus")
                    }, this.visualizeBlur = function() {
                        i.removeCssClass(this.container, "ace_focus")
                    }, this.showComposition = function(e) {
                        this.$composition = e, e.cssText || (e.cssText = this.textarea.style.cssText), e.useTextareaForIME = this.$useTextareaForIME, this.$useTextareaForIME ? (i.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor(), this.$cursorLayer.element.style.display = "none") : e.markerId = this.session.addMarker(e.markerRange, "ace_composition_marker", "text")
                    }, this.setCompositionText = function(e) {
                        var t = this.session.selection.cursor;
                        this.addToken(e, "composition_placeholder", t.row, t.column), this.$moveTextAreaToCursor()
                    }, this.hideComposition = function() {
                        this.$composition && (this.$composition.markerId && this.session.removeMarker(this.$composition.markerId), i.removeCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = this.$composition.cssText, this.$composition = null, this.$cursorLayer.element.style.display = "")
                    }, this.addToken = function(e, t, n, r) {
                        var i = this.session;
                        i.bgTokenizer.lines[n] = null;
                        var o = {
                                type: t,
                                value: e
                            },
                            s = i.getTokens(n);
                        if (null == r) s.push(o);
                        else
                            for (var a = 0, l = 0; l < s.length; l++) {
                                var c = s[l];
                                if (r <= (a += c.value.length)) {
                                    var u = c.value.length - (a - r),
                                        h = c.value.slice(0, u),
                                        d = c.value.slice(u);
                                    s.splice(l, 1, {
                                        type: c.type,
                                        value: h
                                    }, o, {
                                        type: c.type,
                                        value: d
                                    });
                                    break
                                }
                            }
                        this.updateLines(n, n)
                    }, this.setTheme = function(e, t) {
                        var n = this;
                        if (this.$themeId = e, n._dispatchEvent("themeChange", {
                            theme: e
                        }), e && "string" != typeof e) s(e);
                        else {
                            var r = e || this.$options.theme.initialValue;
                            o.loadModule(["theme", r], s)
                        }

                        function s(r) {
                            if (n.$themeId != e) return t && t();
                            if (!r || !r.cssClass) throw new Error("couldn't load module " + e + " or it didn't call define");
                            r.$id && (n.$themeId = r.$id), i.importCssString(r.cssText, r.cssClass, n.container), n.theme && i.removeCssClass(n.container, n.theme.cssClass);
                            var o = "padding" in r ? r.padding : "padding" in (n.theme || {}) ? 4 : n.$padding;
                            n.$padding && o != n.$padding && n.setPadding(o), n.$theme = r.cssClass, n.theme = r, i.addCssClass(n.container, r.cssClass), i.setCssClass(n.container, "ace_dark", r.isDark), n.$size && (n.$size.width = 0, n.$updateSizeAsync()), n._dispatchEvent("themeLoaded", {
                                theme: r
                            }), t && t()
                        }
                    }, this.getTheme = function() {
                        return this.$themeId
                    }, this.setStyle = function(e, t) {
                        i.setCssClass(this.container, e, !1 !== t)
                    }, this.unsetStyle = function(e) {
                        i.removeCssClass(this.container, e)
                    }, this.setCursorStyle = function(e) {
                        i.setStyle(this.scroller.style, "cursor", e)
                    }, this.setMouseCursor = function(e) {
                        i.setStyle(this.scroller.style, "cursor", e)
                    }, this.attachToShadowRoot = function() {
                        i.importCssString(g, "ace_editor.css", this.container)
                    }, this.destroy = function() {
                        this.$fontMetrics.destroy(), this.$cursorLayer.destroy()
                    }
                }).call(y.prototype), o.defineOptions(y.prototype, "renderer", {
                    animatedScroll: {
                        initialValue: !1
                    },
                    showInvisibles: {
                        set: function(e) {
                            this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
                        },
                        initialValue: !1
                    },
                    showPrintMargin: {
                        set: function() {
                            this.$updatePrintMargin()
                        },
                        initialValue: !0
                    },
                    printMarginColumn: {
                        set: function() {
                            this.$updatePrintMargin()
                        },
                        initialValue: 80
                    },
                    printMargin: {
                        set: function(e) {
                            "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
                        },
                        get: function() {
                            return this.$showPrintMargin && this.$printMarginColumn
                        }
                    },
                    showGutter: {
                        set: function(e) {
                            this.$gutter.style.display = e ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize()
                        },
                        initialValue: !0
                    },
                    fadeFoldWidgets: {
                        set: function(e) {
                            i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
                        },
                        initialValue: !1
                    },
                    showFoldWidgets: {
                        set: function(e) {
                            this.$gutterLayer.setShowFoldWidgets(e), this.$loop.schedule(this.CHANGE_GUTTER)
                        },
                        initialValue: !0
                    },
                    displayIndentGuides: {
                        set: function(e) {
                            this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
                        },
                        initialValue: !0
                    },
                    highlightGutterLine: {
                        set: function(e) {
                            this.$gutterLayer.setHighlightGutterLine(e), this.$loop.schedule(this.CHANGE_GUTTER)
                        },
                        initialValue: !0
                    },
                    hScrollBarAlwaysVisible: {
                        set: function(e) {
                            this.$hScrollBarAlwaysVisible && this.$horizScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                        },
                        initialValue: !1
                    },
                    vScrollBarAlwaysVisible: {
                        set: function(e) {
                            this.$vScrollBarAlwaysVisible && this.$vScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                        },
                        initialValue: !1
                    },
                    fontSize: {
                        set: function(e) {
                            "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
                        },
                        initialValue: 12
                    },
                    fontFamily: {
                        set: function(e) {
                            this.container.style.fontFamily = e, this.updateFontSize()
                        }
                    },
                    maxLines: {
                        set: function(e) {
                            this.updateFull()
                        }
                    },
                    minLines: {
                        set: function(e) {
                            this.$minLines < 562949953421311 || (this.$minLines = 0), this.updateFull()
                        }
                    },
                    maxPixelHeight: {
                        set: function(e) {
                            this.updateFull()
                        },
                        initialValue: 0
                    },
                    scrollPastEnd: {
                        set: function(e) {
                            e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL))
                        },
                        initialValue: 0,
                        handlesSet: !0
                    },
                    fixedWidthGutter: {
                        set: function(e) {
                            this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER)
                        }
                    },
                    theme: {
                        set: function(e) {
                            this.setTheme(e)
                        },
                        get: function() {
                            return this.$themeId || this.theme
                        },
                        initialValue: "./theme/textmate",
                        handlesSet: !0
                    },
                    hasCssTransforms: {},
                    useTextareaForIME: {
                        initialValue: !m.isMobile && !m.isIE
                    }
                }), t.VirtualRenderer = y
            }), ace.define("ace/worker/worker_client", [], function(e, t, n) {
                "use strict";
                var r = e("../lib/oop"),
                    i = e("../lib/net"),
                    o = e("../lib/event_emitter").EventEmitter,
                    s = e("../config");

                function a(e) {
                    if ("undefined" == typeof Worker) return {
                        postMessage: function() {},
                        terminate: function() {}
                    };
                    if (s.get("loadWorkerFromBlob")) {
                        var t = function(e) {
                                var t = "importScripts('" + i.qualifyURL(e) + "');";
                                try {
                                    return new Blob([t], {
                                        type: "application/javascript"
                                    })
                                } catch (e) {
                                    var n = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
                                    return n.append(t), n.getBlob("application/javascript")
                                }
                            }(e),
                            n = (window.URL || window.webkitURL).createObjectURL(t);
                        return new Worker(n)
                    }
                    return new Worker(e)
                }
                var l = function(e) {
                    e.postMessage || (e = this.$createWorkerFromOldConfig.apply(this, arguments)), this.$worker = e, this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage
                };
                (function() {
                    r.implement(this, o), this.$createWorkerFromOldConfig = function(t, n, r, i, o) {
                        if (e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), s.get("packaged") || !e.toUrl) i = i || s.moduleUrl(n, "worker");
                        else {
                            var l = this.$normalizePath;
                            i = i || l(e.toUrl("ace/worker/worker.js", null, "_"));
                            var c = {};
                            t.forEach(function(t) {
                                c[t] = l(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
                            })
                        }
                        return this.$worker = a(i), o && this.send("importScripts", o), this.$worker.postMessage({
                            init: !0,
                            tlns: c,
                            module: n,
                            classname: r
                        }), this.$worker
                    }, this.onMessage = function(e) {
                        var t = e.data;
                        switch (t.type) {
                            case "event":
                                this._signal(t.name, {
                                    data: t.data
                                });
                                break;
                            case "call":
                                var n = this.callbacks[t.id];
                                n && (n(t.data), delete this.callbacks[t.id]);
                                break;
                            case "error":
                                this.reportError(t.data);
                                break;
                            case "log":
                                window.console && console.log && console.log.apply(console, t.data)
                        }
                    }, this.reportError = function(e) {
                        window.console && console.error && console.error(e)
                    }, this.$normalizePath = function(e) {
                        return i.qualifyURL(e)
                    }, this.terminate = function() {
                        this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null
                    }, this.send = function(e, t) {
                        this.$worker.postMessage({
                            command: e,
                            args: t
                        })
                    }, this.call = function(e, t, n) {
                        if (n) {
                            var r = this.callbackId++;
                            this.callbacks[r] = n, t.push(r)
                        }
                        this.send(e, t)
                    }, this.emit = function(e, t) {
                        try {
                            t.data && t.data.err && (t.data.err = {
                                message: t.data.err.message,
                                stack: t.data.err.stack,
                                code: t.data.err.code
                            }), this.$worker.postMessage({
                                event: e,
                                data: {
                                    data: t.data
                                }
                            })
                        } catch (e) {
                            console.error(e.stack)
                        }
                    }, this.attachToDocument = function(e) {
                        this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
                    }, this.changeListener = function(e) {
                        this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == e.action ? this.deltaQueue.push(e.start, e.lines) : this.deltaQueue.push(e.start, e.end)
                    }, this.$sendDeltaQueue = function() {
                        var e = this.deltaQueue;
                        e && (this.deltaQueue = null, e.length > 50 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {
                            data: e
                        }))
                    }
                }).call(l.prototype);
                t.UIWorkerClient = function(e, t, n) {
                    var r = null,
                        i = !1,
                        a = Object.create(o),
                        c = [],
                        u = new l({
                            messageBuffer: c,
                            terminate: function() {},
                            postMessage: function(e) {
                                c.push(e), r && (i ? setTimeout(h) : h())
                            }
                        });
                    u.setEmitSync = function(e) {
                        i = e
                    };
                    var h = function() {
                        var e = c.shift();
                        e.command ? r[e.command].apply(r, e.args) : e.event && a._signal(e.event, e.data)
                    };
                    return a.postMessage = function(e) {
                        u.onMessage({
                            data: e
                        })
                    }, a.callback = function(e, t) {
                        this.postMessage({
                            type: "call",
                            id: t,
                            data: e
                        })
                    }, a.emit = function(e, t) {
                        this.postMessage({
                            type: "event",
                            name: e,
                            data: t
                        })
                    }, s.loadModule(["worker", t], function(e) {
                        for (r = new e[n](a); c.length;) h()
                    }), u
                }, t.WorkerClient = l, t.createWorker = a
            }), ace.define("ace/placeholder", [], function(e, t, n) {
                "use strict";
                var r = e("./range").Range,
                    i = e("./lib/event_emitter").EventEmitter,
                    o = e("./lib/oop"),
                    s = function(e, t, n, r, i, o) {
                        var s = this;
                        this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = i, this.othersClass = o, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = r, this.$onCursorChange = function() {
                            setTimeout(function() {
                                s.onCursorChange()
                            })
                        }, this.$pos = n;
                        var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {
                            length: -1
                        };
                        this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
                    };
                (function() {
                    o.implement(this, i), this.setup = function() {
                        var e = this,
                            t = this.doc,
                            n = this.session;
                        this.selectionBefore = n.selection.toJSON(), n.selection.inMultiSelectMode && n.selection.toSingleRange(), this.pos = t.createAnchor(this.$pos.row, this.$pos.column);
                        var i = this.pos;
                        i.$insertRight = !0, i.detach(), i.markerId = n.addMarker(new r(i.row, i.column, i.row, i.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach(function(n) {
                            var r = t.createAnchor(n.row, n.column);
                            r.$insertRight = !0, r.detach(), e.others.push(r)
                        }), n.setUndoSelect(!1)
                    }, this.showOtherMarkers = function() {
                        if (!this.othersActive) {
                            var e = this.session,
                                t = this;
                            this.othersActive = !0, this.others.forEach(function(n) {
                                n.markerId = e.addMarker(new r(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1)
                            })
                        }
                    }, this.hideOtherMarkers = function() {
                        if (this.othersActive) {
                            this.othersActive = !1;
                            for (var e = 0; e < this.others.length; e++) this.session.removeMarker(this.others[e].markerId)
                        }
                    }, this.onUpdate = function(e) {
                        if (this.$updating) return this.updateAnchors(e);
                        var t = e;
                        if (t.start.row === t.end.row && t.start.row === this.pos.row) {
                            this.$updating = !0;
                            var n = "insert" === e.action ? t.end.column - t.start.column : t.start.column - t.end.column,
                                i = t.start.column >= this.pos.column && t.start.column <= this.pos.column + this.length + 1,
                                o = t.start.column - this.pos.column;
                            if (this.updateAnchors(e), i && (this.length += n), i && !this.session.$fromUndo)
                                if ("insert" === e.action)
                                    for (var s = this.others.length - 1; s >= 0; s--) {
                                        var a = {
                                            row: (l = this.others[s]).row,
                                            column: l.column + o
                                        };
                                        this.doc.insertMergedLines(a, e.lines)
                                    } else if ("remove" === e.action)
                                    for (s = this.others.length - 1; s >= 0; s--) {
                                        var l;
                                        a = {
                                            row: (l = this.others[s]).row,
                                            column: l.column + o
                                        };
                                        this.doc.remove(new r(a.row, a.column, a.row, a.column - n))
                                    }
                            this.$updating = !1, this.updateMarkers()
                        }
                    }, this.updateAnchors = function(e) {
                        this.pos.onChange(e);
                        for (var t = this.others.length; t--;) this.others[t].onChange(e);
                        this.updateMarkers()
                    }, this.updateMarkers = function() {
                        if (!this.$updating) {
                            var e = this,
                                t = this.session,
                                n = function(n, i) {
                                    t.removeMarker(n.markerId), n.markerId = t.addMarker(new r(n.row, n.column, n.row, n.column + e.length), i, null, !1)
                                };
                            n(this.pos, this.mainClass);
                            for (var i = this.others.length; i--;) n(this.others[i], this.othersClass)
                        }
                    }, this.onCursorChange = function(e) {
                        if (!this.$updating && this.session) {
                            var t = this.session.selection.getCursor();
                            t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
                        }
                    }, this.detach = function() {
                        this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null
                    }, this.cancel = function() {
                        if (-1 !== this.$undoStackDepth) {
                            for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, n = 0; n < t; n++) e.undo(this.session, !0);
                            this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore)
                        }
                    }
                }).call(s.prototype), t.PlaceHolder = s
            }), ace.define("ace/mouse/multi_select_handler", [], function(e, t, n) {
                var r = e("../lib/event"),
                    i = e("../lib/useragent");

                function o(e, t) {
                    return e.row == t.row && e.column == t.column
                }
                t.onMouseDown = function(e) {
                    var t = e.domEvent,
                        n = t.altKey,
                        s = t.shiftKey,
                        a = t.ctrlKey,
                        l = e.getAccelKey(),
                        c = e.getButton();
                    if (a && i.isMac && (c = t.button), e.editor.inMultiSelectMode && 2 == c) e.editor.textInput.onContextMenu(e.domEvent);
                    else if (a || n || l) {
                        if (0 === c) {
                            var u, h = e.editor,
                                d = h.selection,
                                f = h.inMultiSelectMode,
                                p = e.getDocumentPosition(),
                                g = d.getCursor(),
                                m = e.inSelection() || d.isEmpty() && o(p, g),
                                v = e.x,
                                y = e.y,
                                b = h.session,
                                w = h.renderer.pixelToScreenCoordinates(v, y),
                                _ = w;
                            if (h.$mouseHandler.$enableJumpToDef) a && n || l && n ? u = s ? "block" : "add" : n && h.$blockSelectEnabled && (u = "block");
                            else if (l && !n) {
                                if (u = "add", !f && s) return
                            } else n && h.$blockSelectEnabled && (u = "block");
                            if (u && i.isMac && t.ctrlKey && h.$mouseHandler.cancelContextMenu(), "add" == u) {
                                if (!f && m) return;
                                if (!f) {
                                    var C = d.toOrientedRange();
                                    h.addSelectionMarker(C)
                                }
                                var S = d.rangeList.rangeAtPoint(p);
                                h.inVirtualSelectionMode = !0, s && (S = null, C = d.ranges[0] || C, h.removeSelectionMarker(C)), h.once("mouseup", function() {
                                    var e = d.toOrientedRange();
                                    S && e.isEmpty() && o(S.cursor, e.cursor) ? d.substractPoint(e.cursor) : (s ? d.substractPoint(C.cursor) : C && (h.removeSelectionMarker(C), d.addRange(C)), d.addRange(e)), h.inVirtualSelectionMode = !1
                                })
                            } else if ("block" == u) {
                                var k;
                                e.stop(), h.inVirtualSelectionMode = !0;
                                var A = [],
                                    x = function() {
                                        var e = h.renderer.pixelToScreenCoordinates(v, y),
                                            t = b.screenToDocumentPosition(e.row, e.column, e.offsetX);
                                        o(_, e) && o(t, d.lead) || (_ = e, h.selection.moveToPosition(t), h.renderer.scrollCursorIntoView(), h.removeSelectionMarkers(A), A = d.rectangularRangeBlock(_, w), h.$mouseHandler.$clickSelection && 1 == A.length && A[0].isEmpty() && (A[0] = h.$mouseHandler.$clickSelection.clone()), A.forEach(h.addSelectionMarker, h), h.updateSelectionMarkers())
                                    };
                                f && !l ? d.toSingleRange() : !f && l && (k = d.toOrientedRange(), h.addSelectionMarker(k)), s ? w = b.documentToScreenPosition(d.lead) : d.moveToPosition(p), _ = {
                                    row: -1,
                                    column: -1
                                };
                                var $ = x;
                                r.capture(h.container, function(e) {
                                    v = e.clientX, y = e.clientY
                                }, function(e) {
                                    x(), clearInterval(T), h.removeSelectionMarkers(A), A.length || (A = [d.toOrientedRange()]), k && (h.removeSelectionMarker(k), d.toSingleRange(k));
                                    for (var t = 0; t < A.length; t++) d.addRange(A[t]);
                                    h.inVirtualSelectionMode = !1, h.$mouseHandler.$clickSelection = null
                                });
                                var T = setInterval(function() {
                                    $()
                                }, 20);
                                return e.preventDefault()
                            }
                        }
                    } else 0 === c && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode()
                }
            }), ace.define("ace/commands/multi_select_commands", [], function(e, t, n) {
                t.defaultCommands = [{
                    name: "addCursorAbove",
                    description: "Add cursor above",
                    exec: function(e) {
                        e.selectMoreLines(-1)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Up",
                        mac: "Ctrl-Alt-Up"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "addCursorBelow",
                    description: "Add cursor below",
                    exec: function(e) {
                        e.selectMoreLines(1)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Down",
                        mac: "Ctrl-Alt-Down"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "addCursorAboveSkipCurrent",
                    description: "Add cursor above (skip current)",
                    exec: function(e) {
                        e.selectMoreLines(-1, !0)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Shift-Up",
                        mac: "Ctrl-Alt-Shift-Up"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "addCursorBelowSkipCurrent",
                    description: "Add cursor below (skip current)",
                    exec: function(e) {
                        e.selectMoreLines(1, !0)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Shift-Down",
                        mac: "Ctrl-Alt-Shift-Down"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectMoreBefore",
                    description: "Select more before",
                    exec: function(e) {
                        e.selectMore(-1)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Left",
                        mac: "Ctrl-Alt-Left"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectMoreAfter",
                    description: "Select more after",
                    exec: function(e) {
                        e.selectMore(1)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Right",
                        mac: "Ctrl-Alt-Right"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectNextBefore",
                    description: "Select next before",
                    exec: function(e) {
                        e.selectMore(-1, !0)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Shift-Left",
                        mac: "Ctrl-Alt-Shift-Left"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "selectNextAfter",
                    description: "Select next after",
                    exec: function(e) {
                        e.selectMore(1, !0)
                    },
                    bindKey: {
                        win: "Ctrl-Alt-Shift-Right",
                        mac: "Ctrl-Alt-Shift-Right"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }, {
                    name: "splitIntoLines",
                    description: "Split into lines",
                    exec: function(e) {
                        e.multiSelect.splitIntoLines()
                    },
                    bindKey: {
                        win: "Ctrl-Alt-L",
                        mac: "Ctrl-Alt-L"
                    },
                    readOnly: !0
                }, {
                    name: "alignCursors",
                    description: "Align cursors",
                    exec: function(e) {
                        e.alignCursors()
                    },
                    bindKey: {
                        win: "Ctrl-Alt-A",
                        mac: "Ctrl-Alt-A"
                    },
                    scrollIntoView: "cursor"
                }, {
                    name: "findAll",
                    description: "Find all",
                    exec: function(e) {
                        e.findAll()
                    },
                    bindKey: {
                        win: "Ctrl-Alt-K",
                        mac: "Ctrl-Alt-G"
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0
                }], t.multiSelectCommands = [{
                    name: "singleSelection",
                    description: "Single selection",
                    bindKey: "esc",
                    exec: function(e) {
                        e.exitMultiSelectMode()
                    },
                    scrollIntoView: "cursor",
                    readOnly: !0,
                    isAvailable: function(e) {
                        return e && e.inMultiSelectMode
                    }
                }];
                var r = e("../keyboard/hash_handler").HashHandler;
                t.keyboardHandler = new r(t.multiSelectCommands)
            }), ace.define("ace/multi_select", [], function(e, t, n) {
                var r = e("./range_list").RangeList,
                    i = e("./range").Range,
                    o = e("./selection").Selection,
                    s = e("./mouse/multi_select_handler").onMouseDown,
                    a = e("./lib/event"),
                    l = e("./lib/lang"),
                    c = e("./commands/multi_select_commands");
                t.commands = c.defaultCommands.concat(c.multiSelectCommands);
                var u = new(0, e("./search").Search);
                var h = e("./edit_session").EditSession;
                (function() {
                    this.getSelectionMarkers = function() {
                        return this.$selectionMarkers
                    }
                }).call(h.prototype),
                    function() {
                        this.ranges = null, this.rangeList = null, this.addRange = function(e, t) {
                            if (e) {
                                if (!this.inMultiSelectMode && 0 === this.rangeCount) {
                                    var n = this.toOrientedRange();
                                    if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                                    this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n)
                                }
                                e.cursor || (e.cursor = e.end);
                                var r = this.rangeList.add(e);
                                return this.$onAddRange(e), r.length && this.$onRemoveRange(r), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
                            }
                        }, this.toSingleRange = function(e) {
                            e = e || this.ranges[0];
                            var t = this.rangeList.removeAll();
                            t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
                        }, this.substractPoint = function(e) {
                            var t = this.rangeList.substractPoint(e);
                            if (t) return this.$onRemoveRange(t), t[0]
                        }, this.mergeOverlappingRanges = function() {
                            var e = this.rangeList.merge();
                            e.length && this.$onRemoveRange(e)
                        }, this.$onAddRange = function(e) {
                            this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._signal("addRange", {
                                range: e
                            })
                        }, this.$onRemoveRange = function(e) {
                            if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                                var t = this.rangeList.ranges.pop();
                                e.push(t), this.rangeCount = 0
                            }
                            for (var n = e.length; n--;) {
                                var r = this.ranges.indexOf(e[n]);
                                this.ranges.splice(r, 1)
                            }
                            this._signal("removeRange", {
                                ranges: e
                            }), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), (t = t || this.ranges[0]) && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
                        }, this.$initRangeList = function() {
                            this.rangeList || (this.rangeList = new r, this.ranges = [], this.rangeCount = 0)
                        }, this.getAllRanges = function() {
                            return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
                        }, this.splitIntoLines = function() {
                            if (this.rangeCount > 1) {
                                var e = this.rangeList.ranges,
                                    t = e[e.length - 1],
                                    n = i.fromPoints(e[0].start, t.end);
                                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                            } else {
                                n = this.getRange();
                                var r = this.isBackwards(),
                                    o = n.start.row,
                                    s = n.end.row;
                                if (o == s) {
                                    if (r) var a = n.end,
                                        l = n.start;
                                    else a = n.start, l = n.end;
                                    return this.addRange(i.fromPoints(l, l)), void this.addRange(i.fromPoints(a, a))
                                }
                                var c = [],
                                    u = this.getLineRange(o, !0);
                                u.start.column = n.start.column, c.push(u);
                                for (var h = o + 1; h < s; h++) c.push(this.getLineRange(h, !0));
                                (u = this.getLineRange(s, !0)).end.column = n.end.column, c.push(u), c.forEach(this.addRange, this)
                            }
                        }, this.toggleBlockSelection = function() {
                            if (this.rangeCount > 1) {
                                var e = this.rangeList.ranges,
                                    t = e[e.length - 1],
                                    n = i.fromPoints(e[0].start, t.end);
                                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                            } else {
                                var r = this.session.documentToScreenPosition(this.cursor),
                                    o = this.session.documentToScreenPosition(this.anchor);
                                this.rectangularRangeBlock(r, o).forEach(this.addRange, this)
                            }
                        }, this.rectangularRangeBlock = function(e, t, n) {
                            var r = [],
                                o = e.column < t.column;
                            if (o) var s = e.column,
                                a = t.column,
                                l = e.offsetX,
                                c = t.offsetX;
                            else s = t.column, a = e.column, l = t.offsetX, c = e.offsetX;
                            var u, h, d, f = e.row < t.row;
                            if (f) var p = e.row,
                                g = t.row;
                            else p = t.row, g = e.row;
                            s < 0 && (s = 0), p < 0 && (p = 0), p == g && (n = !0);
                            for (var m = p; m <= g; m++) {
                                var v = i.fromPoints(this.session.screenToDocumentPosition(m, s, l), this.session.screenToDocumentPosition(m, a, c));
                                if (v.isEmpty()) {
                                    if (u && (h = v.end, d = u, h.row == d.row && h.column == d.column)) break;
                                    u = v.end
                                }
                                v.cursor = o ? v.start : v.end, r.push(v)
                            }
                            if (f && r.reverse(), !n) {
                                for (var y = r.length - 1; r[y].isEmpty() && y > 0;) y--;
                                if (y > 0)
                                    for (var b = 0; r[b].isEmpty();) b++;
                                for (var w = y; w >= b; w--) r[w].isEmpty() && r.splice(w, 1)
                            }
                            return r
                        }
                    }.call(o.prototype);
                var d = e("./editor").Editor;

                function f(e) {
                    e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$checkMultiselectChange = e.$checkMultiselectChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", s), e.commands.addCommands(c.defaultCommands), function(e) {
                        var t = e.textInput.getElement(),
                            n = !1;

                        function r(t) {
                            n && (e.renderer.setMouseCursor(""), n = !1)
                        }
                        a.addListener(t, "keydown", function(t) {
                            var i = 18 == t.keyCode && !(t.ctrlKey || t.shiftKey || t.metaKey);
                            e.$blockSelectEnabled && i ? n || (e.renderer.setMouseCursor("crosshair"), n = !0) : n && r()
                        }), a.addListener(t, "keyup", r), a.addListener(t, "blur", r)
                    }(e))
                }(function() {
                    this.updateSelectionMarkers = function() {
                        this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                    }, this.addSelectionMarker = function(e) {
                        e.cursor || (e.cursor = e.end);
                        var t = this.getSelectionStyle();
                        return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
                    }, this.removeSelectionMarker = function(e) {
                        if (e.marker) {
                            this.session.removeMarker(e.marker);
                            var t = this.session.$selectionMarkers.indexOf(e); - 1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
                        }
                    }, this.removeSelectionMarkers = function(e) {
                        for (var t = this.session.$selectionMarkers, n = e.length; n--;) {
                            var r = e[n];
                            if (r.marker) {
                                this.session.removeMarker(r.marker);
                                var i = t.indexOf(r); - 1 != i && t.splice(i, 1)
                            }
                        }
                        this.session.selectionMarkerCount = t.length
                    }, this.$onAddRange = function(e) {
                        this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                    }, this.$onRemoveRange = function(e) {
                        this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                    }, this.$onMultiSelect = function(e) {
                        this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(c.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
                    }, this.$onSingleSelect = function(e) {
                        this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(c.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection"))
                    }, this.$onMultiSelectExec = function(e) {
                        var t = e.command,
                            n = e.editor;
                        if (n.multiSelect) {
                            if (t.multiSelectAction) "forEach" == t.multiSelectAction ? r = n.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? r = n.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (n.exitMultiSelectMode(), r = t.exec(n, e.args || {})) : r = t.multiSelectAction(n, e.args || {});
                            else {
                                var r = t.exec(n, e.args || {});
                                n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges()
                            }
                            return r
                        }
                    }, this.forEachSelection = function(e, t, n) {
                        if (!this.inVirtualSelectionMode) {
                            var r, i = n && n.keepOrder,
                                s = 1 == n || n && n.$byLines,
                                a = this.session,
                                l = this.selection,
                                c = l.rangeList,
                                u = (i ? l : c).ranges;
                            if (!u.length) return e.exec ? e.exec(this, t || {}) : e(this, t || {});
                            var h = l._eventRegistry;
                            l._eventRegistry = {};
                            var d = new o(a);
                            this.inVirtualSelectionMode = !0;
                            for (var f = u.length; f--;) {
                                if (s)
                                    for (; f > 0 && u[f].start.row == u[f - 1].end.row;) f--;
                                d.fromOrientedRange(u[f]), d.index = f, this.selection = a.selection = d;
                                var p = e.exec ? e.exec(this, t || {}) : e(this, t || {});
                                r || void 0 === p || (r = p), d.toOrientedRange(u[f])
                            }
                            d.detach(), this.selection = a.selection = l, this.inVirtualSelectionMode = !1, l._eventRegistry = h, l.mergeOverlappingRanges(), l.ranges[0] && l.fromOrientedRange(l.ranges[0]);
                            var g = this.renderer.$scrollAnimation;
                            return this.onCursorChange(), this.onSelectionChange(), g && g.from == g.to && this.renderer.animateScrolling(g.from), r
                        }
                    }, this.exitMultiSelectMode = function() {
                        this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange()
                    }, this.getSelectedText = function() {
                        var e = "";
                        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                            for (var t = this.multiSelect.rangeList.ranges, n = [], r = 0; r < t.length; r++) n.push(this.session.getTextRange(t[r]));
                            var i = this.session.getDocument().getNewLineCharacter();
                            (e = n.join(i)).length == (n.length - 1) * i.length && (e = "")
                        } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
                        return e
                    }, this.$checkMultiselectChange = function(e, t) {
                        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                            var n = this.multiSelect.ranges[0];
                            if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor) return;
                            var r = t == this.multiSelect.anchor ? n.cursor == n.start ? n.end : n.start : n.cursor;
                            r.row != t.row || this.session.$clipPositionToDocument(r.row, r.column).column != t.column ? this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()) : this.multiSelect.mergeOverlappingRanges()
                        }
                    }, this.findAll = function(e, t, n) {
                        if ((t = t || {}).needle = e || t.needle, null == t.needle) {
                            var r = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
                            t.needle = this.session.getTextRange(r)
                        }
                        this.$search.set(t);
                        var i = this.$search.findAll(this.session);
                        if (!i.length) return 0;
                        var o = this.multiSelect;
                        n || o.toSingleRange(i[0]);
                        for (var s = i.length; s--;) o.addRange(i[s], !0);
                        return r && o.rangeList.rangeAtPoint(r.start) && o.addRange(r, !0), i.length
                    }, this.selectMoreLines = function(e, t) {
                        var n = this.selection.toOrientedRange(),
                            r = n.cursor == n.end,
                            o = this.session.documentToScreenPosition(n.cursor);
                        this.selection.$desiredColumn && (o.column = this.selection.$desiredColumn);
                        var s, a = this.session.screenToDocumentPosition(o.row + e, o.column);
                        if (n.isEmpty()) c = a;
                        else var l = this.session.documentToScreenPosition(r ? n.end : n.start),
                            c = this.session.screenToDocumentPosition(l.row + e, l.column);
                        r ? (s = i.fromPoints(a, c)).cursor = s.start : (s = i.fromPoints(c, a)).cursor = s.end;
                        if (s.desiredColumn = o.column, this.selection.inMultiSelectMode) {
                            if (t) var u = n.cursor
                        } else this.selection.addRange(n);
                        this.selection.addRange(s), u && this.selection.substractPoint(u)
                    }, this.transposeSelections = function(e) {
                        for (var t = this.session, n = t.multiSelect, r = n.ranges, i = r.length; i--;) {
                            if ((a = r[i]).isEmpty()) {
                                var o = t.getWordRange(a.start.row, a.start.column);
                                a.start.row = o.start.row, a.start.column = o.start.column, a.end.row = o.end.row, a.end.column = o.end.column
                            }
                        }
                        n.mergeOverlappingRanges();
                        var s = [];
                        for (i = r.length; i--;) {
                            var a = r[i];
                            s.unshift(t.getTextRange(a))
                        }
                        e < 0 ? s.unshift(s.pop()) : s.push(s.shift());
                        for (i = r.length; i--;) {
                            o = (a = r[i]).clone();
                            t.replace(a, s[i]), a.start.row = o.start.row, a.start.column = o.start.column
                        }
                        n.fromOrientedRange(n.ranges[0])
                    }, this.selectMore = function(e, t, n) {
                        var r = this.session,
                            i = r.multiSelect.toOrientedRange();
                        if (!i.isEmpty() || ((i = r.getWordRange(i.start.row, i.start.column)).cursor = -1 == e ? i.start : i.end, this.multiSelect.addRange(i), !n)) {
                            var o = r.getTextRange(i),
                                s = function(e, t, n) {
                                    return u.$options.wrap = !0, u.$options.needle = t, u.$options.backwards = -1 == n, u.find(e)
                                }(r, o, e);
                            s && (s.cursor = -1 == e ? s.start : s.end, this.session.unfold(s), this.multiSelect.addRange(s), this.renderer.scrollCursorIntoView(null, .5)), t && this.multiSelect.substractPoint(i.cursor)
                        }
                    }, this.alignCursors = function() {
                        var e = this.session,
                            t = e.multiSelect,
                            n = t.ranges,
                            r = -1,
                            o = n.filter(function(e) {
                                if (e.cursor.row == r) return !0;
                                r = e.cursor.row
                            });
                        if (n.length && o.length != n.length - 1) {
                            o.forEach(function(e) {
                                t.substractPoint(e.cursor)
                            });
                            var s = 0,
                                a = 1 / 0,
                                c = n.map(function(t) {
                                    var n = t.cursor,
                                        r = e.getLine(n.row).substr(n.column).search(/\S/g);
                                    return -1 == r && (r = 0), n.column > s && (s = n.column), r < a && (a = r), r
                                });
                            n.forEach(function(t, n) {
                                var r = t.cursor,
                                    o = s - r.column,
                                    u = c[n] - a;
                                o > u ? e.insert(r, l.stringRepeat(" ", o - u)) : e.remove(new i(r.row, r.column, r.row, r.column - o + u)), t.start.column = t.end.column = s, t.start.row = t.end.row = r.row, t.cursor = t.end
                            }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                        } else {
                            var u = this.selection.getRange(),
                                h = u.start.row,
                                d = u.end.row,
                                f = h == d;
                            if (f) {
                                var p, g = this.session.getLength();
                                do {
                                    p = this.session.getLine(d)
                                } while (/[=:]/.test(p) && ++d < g);
                                do {
                                    p = this.session.getLine(h)
                                } while (/[=:]/.test(p) && --h > 0);
                                h < 0 && (h = 0), d >= g && (d = g - 1)
                            }
                            var m = this.session.removeFullLines(h, d);
                            m = this.$reAlignText(m, f), this.session.insert({
                                row: h,
                                column: 0
                            }, m.join("\n") + "\n"), f || (u.start.column = 0, u.end.column = m[m.length - 1].length), this.selection.setRange(u)
                        }
                    }, this.$reAlignText = function(e, t) {
                        var n, r, i, o = !0,
                            s = !0;
                        return e.map(function(e) {
                            var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                            return t ? null == n ? (n = t[1].length, r = t[2].length, i = t[3].length, t) : (n + r + i != t[1].length + t[2].length + t[3].length && (s = !1), n != t[1].length && (o = !1), n > t[1].length && (n = t[1].length), r < t[2].length && (r = t[2].length), i > t[3].length && (i = t[3].length), t) : [e]
                        }).map(t ? c : o ? s ? function(e) {
                            return e[2] ? a(n + r - e[2].length) + e[2] + a(i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                        } : c : function(e) {
                            return e[2] ? a(n) + e[2] + a(i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                        });

                        function a(e) {
                            return l.stringRepeat(" ", e)
                        }

                        function c(e) {
                            return e[2] ? a(n) + e[2] + a(r - e[2].length + i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
                        }
                    }
                }).call(d.prototype), t.onSessionChange = function(e) {
                    var t = e.session;
                    t && !t.multiSelect && (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t && t.multiSelect;
                    var n = e.oldSession;
                    n && (n.multiSelect.off("addRange", this.$onAddRange), n.multiSelect.off("removeRange", this.$onRemoveRange), n.multiSelect.off("multiSelect", this.$onMultiSelect), n.multiSelect.off("singleSelect", this.$onSingleSelect), n.multiSelect.lead.off("change", this.$checkMultiselectChange), n.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t && (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), t.multiSelect.lead.on("change", this.$checkMultiselectChange), t.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t && this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
                }, t.MultiSelect = f, e("./config").defineOptions(d.prototype, "editor", {
                    enableMultiselect: {
                        set: function(e) {
                            f(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", s)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", s))
                        },
                        value: !0
                    },
                    enableBlockSelect: {
                        set: function(e) {
                            this.$blockSelectEnabled = e
                        },
                        value: !0
                    }
                })
            }), ace.define("ace/mode/folding/fold_mode", [], function(e, t, n) {
                "use strict";
                var r = e("../../range").Range,
                    i = t.FoldMode = function() {};
                (function() {
                    this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e, t, n) {
                        var r = e.getLine(n);
                        return this.foldingStartMarker.test(r) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(r) ? "end" : ""
                    }, this.getFoldWidgetRange = function(e, t, n) {
                        return null
                    }, this.indentationBlock = function(e, t, n) {
                        var i = /\S/,
                            o = e.getLine(t),
                            s = o.search(i);
                        if (-1 != s) {
                            for (var a = n || o.length, l = e.getLength(), c = t, u = t; ++t < l;) {
                                var h = e.getLine(t).search(i);
                                if (-1 != h) {
                                    if (h <= s) break;
                                    u = t
                                }
                            }
                            if (u > c) {
                                var d = e.getLine(u).length;
                                return new r(c, a, u, d)
                            }
                        }
                    }, this.openingBracketBlock = function(e, t, n, i, o) {
                        var s = {
                                row: n,
                                column: i + 1
                            },
                            a = e.$findClosingBracket(t, s, o);
                        if (a) {
                            var l = e.foldWidgets[a.row];
                            return null == l && (l = e.getFoldWidget(a.row)), "start" == l && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), r.fromPoints(s, a)
                        }
                    }, this.closingBracketBlock = function(e, t, n, i, o) {
                        var s = {
                                row: n,
                                column: i
                            },
                            a = e.$findOpeningBracket(t, s);
                        if (a) return a.column++, s.column--, r.fromPoints(a, s)
                    }
                }).call(i.prototype)
            }), ace.define("ace/theme/textmate", [], function(e, t, n) {
                "use strict";
                t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}', t.$id = "ace/theme/textmate", e("../lib/dom").importCssString(t.cssText, t.cssClass)
            }), ace.define("ace/line_widgets", [], function(e, t, n) {
                "use strict";
                e("./lib/oop");
                var r = e("./lib/dom");
                e("./range").Range;

                function i(e) {
                    this.session = e, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor)
                }(function() {
                    this.getRowLength = function(e) {
                        var t;
                        return t = this.lineWidgets && this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0, this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
                    }, this.$getWidgetScreenLength = function() {
                        var e = 0;
                        return this.lineWidgets.forEach(function(t) {
                            t && t.rowCount && !t.hidden && (e += t.rowCount)
                        }), e
                    }, this.$onChangeEditor = function(e) {
                        this.attach(e.editor)
                    }, this.attach = function(e) {
                        e && e.widgetManager && e.widgetManager != this && e.widgetManager.detach(), this.editor != e && (this.detach(), this.editor = e, e && (e.widgetManager = this, e.renderer.on("beforeRender", this.measureWidgets), e.renderer.on("afterRender", this.renderWidgets)))
                    }, this.detach = function(e) {
                        var t = this.editor;
                        if (t) {
                            this.editor = null, t.widgetManager = null, t.renderer.off("beforeRender", this.measureWidgets), t.renderer.off("afterRender", this.renderWidgets);
                            var n = this.session.lineWidgets;
                            n && n.forEach(function(e) {
                                e && e.el && e.el.parentNode && (e._inDocument = !1, e.el.parentNode.removeChild(e.el))
                            })
                        }
                    }, this.updateOnFold = function(e, t) {
                        var n = t.lineWidgets;
                        if (n && e.action) {
                            for (var r = e.data, i = r.start.row, o = r.end.row, s = "add" == e.action, a = i + 1; a < o; a++) n[a] && (n[a].hidden = s);
                            n[o] && (s ? n[i] ? n[o].hidden = s : n[i] = n[o] : (n[i] == n[o] && (n[i] = void 0), n[o].hidden = s))
                        }
                    }, this.updateOnChange = function(e) {
                        var t = this.session.lineWidgets;
                        if (t) {
                            var n = e.start.row,
                                r = e.end.row - n;
                            if (0 === r);
                            else if ("remove" == e.action) {
                                t.splice(n + 1, r).forEach(function(e) {
                                    e && this.removeLineWidget(e)
                                }, this), this.$updateRows()
                            } else {
                                var i = new Array(r);
                                i.unshift(n, 0), t.splice.apply(t, i), this.$updateRows()
                            }
                        }
                    }, this.$updateRows = function() {
                        var e = this.session.lineWidgets;
                        if (e) {
                            var t = !0;
                            e.forEach(function(e, n) {
                                if (e)
                                    for (t = !1, e.row = n; e.$oldWidget;) e.$oldWidget.row = n, e = e.$oldWidget
                            }), t && (this.session.lineWidgets = null)
                        }
                    }, this.addLineWidget = function(e) {
                        this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
                        var t = this.session.lineWidgets[e.row];
                        t && (e.$oldWidget = t, t.el && t.el.parentNode && (t.el.parentNode.removeChild(t.el), t._inDocument = !1)), this.session.lineWidgets[e.row] = e, e.session = this.session;
                        var n = this.editor.renderer;
                        e.html && !e.el && (e.el = r.createElement("div"), e.el.innerHTML = e.html), e.el && (r.addCssClass(e.el, "ace_lineWidgetContainer"), e.el.style.position = "absolute", e.el.style.zIndex = 5, n.container.appendChild(e.el), e._inDocument = !0), e.coverGutter || (e.el.style.zIndex = 3), null == e.pixelHeight && (e.pixelHeight = e.el.offsetHeight), null == e.rowCount && (e.rowCount = e.pixelHeight / n.layerConfig.lineHeight);
                        var i = this.session.getFoldAt(e.row, 0);
                        if (e.$fold = i, i) {
                            var o = this.session.lineWidgets;
                            e.row != i.end.row || o[i.start.row] ? e.hidden = !0 : o[i.start.row] = e
                        }
                        return this.session._emit("changeFold", {
                            data: {
                                start: {
                                    row: e.row
                                }
                            }
                        }), this.$updateRows(), this.renderWidgets(null, n), this.onWidgetChanged(e), e
                    }, this.removeLineWidget = function(e) {
                        if (e._inDocument = !1, e.session = null, e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el), e.editor && e.editor.destroy) try {
                            e.editor.destroy()
                        } catch (e) {}
                        if (this.session.lineWidgets) {
                            var t = this.session.lineWidgets[e.row];
                            if (t == e) this.session.lineWidgets[e.row] = e.$oldWidget, e.$oldWidget && this.onWidgetChanged(e.$oldWidget);
                            else
                                for (; t;) {
                                    if (t.$oldWidget == e) {
                                        t.$oldWidget = e.$oldWidget;
                                        break
                                    }
                                    t = t.$oldWidget
                                }
                        }
                        this.session._emit("changeFold", {
                            data: {
                                start: {
                                    row: e.row
                                }
                            }
                        }), this.$updateRows()
                    }, this.getWidgetsAtRow = function(e) {
                        for (var t = this.session.lineWidgets, n = t && t[e], r = []; n;) r.push(n), n = n.$oldWidget;
                        return r
                    }, this.onWidgetChanged = function(e) {
                        this.session._changedWidgets.push(e), this.editor && this.editor.renderer.updateFull()
                    }, this.measureWidgets = function(e, t) {
                        var n = this.session._changedWidgets,
                            r = t.layerConfig;
                        if (n && n.length) {
                            for (var i = 1 / 0, o = 0; o < n.length; o++) {
                                var s = n[o];
                                if (s && s.el && s.session == this.session) {
                                    if (!s._inDocument) {
                                        if (this.session.lineWidgets[s.row] != s) continue;
                                        s._inDocument = !0, t.container.appendChild(s.el)
                                    }
                                    s.h = s.el.offsetHeight, s.fixedWidth || (s.w = s.el.offsetWidth, s.screenWidth = Math.ceil(s.w / r.characterWidth));
                                    var a = s.h / r.lineHeight;
                                    s.coverLine && (a -= this.session.getRowLineCount(s.row)) < 0 && (a = 0), s.rowCount != a && (s.rowCount = a, s.row < i && (i = s.row))
                                }
                            }
                            i != 1 / 0 && (this.session._emit("changeFold", {
                                data: {
                                    start: {
                                        row: i
                                    }
                                }
                            }), this.session.lineWidgetWidth = null), this.session._changedWidgets = []
                        }
                    }, this.renderWidgets = function(e, t) {
                        var n = t.layerConfig,
                            r = this.session.lineWidgets;
                        if (r) {
                            for (var i = Math.min(this.firstRow, n.firstRow), o = Math.max(this.lastRow, n.lastRow, r.length); i > 0 && !r[i];) i--;
                            this.firstRow = n.firstRow, this.lastRow = n.lastRow, t.$cursorLayer.config = n;
                            for (var s = i; s <= o; s++) {
                                var a = r[s];
                                if (a && a.el)
                                    if (a.hidden) a.el.style.top = -100 - (a.pixelHeight || 0) + "px";
                                    else {
                                        a._inDocument || (a._inDocument = !0, t.container.appendChild(a.el));
                                        var l = t.$cursorLayer.getPixelPosition({
                                            row: s,
                                            column: 0
                                        }, !0).top;
                                        a.coverLine || (l += n.lineHeight * this.session.getRowLineCount(a.row)), a.el.style.top = l - n.offset + "px";
                                        var c = a.coverGutter ? 0 : t.gutterWidth;
                                        a.fixedWidth || (c -= t.scrollLeft), a.el.style.left = c + "px", a.fullWidth && a.screenWidth && (a.el.style.minWidth = n.width + 2 * n.padding + "px"), a.fixedWidth ? a.el.style.right = t.scrollBar.getWidth() + "px" : a.el.style.right = ""
                                    }
                            }
                        }
                    }
                }).call(i.prototype), t.LineWidgets = i
            }), ace.define("ace/ext/error_marker", [], function(e, t, n) {
                "use strict";
                var r = e("../line_widgets").LineWidgets,
                    i = e("../lib/dom"),
                    o = e("../range").Range;
                t.showErrorMarker = function(e, t) {
                    var n = e.session;
                    n.widgetManager || (n.widgetManager = new r(n), n.widgetManager.attach(e));
                    var s = e.getCursorPosition(),
                        a = s.row,
                        l = n.widgetManager.getWidgetsAtRow(a).filter(function(e) {
                            return "errorMarker" == e.type
                        })[0];
                    l ? l.destroy() : a -= t;
                    var c, u = function(e, t, n) {
                        var r = e.getAnnotations().sort(o.comparePoints);
                        if (r.length) {
                            var i = function(e, t, n) {
                                for (var r = 0, i = e.length - 1; r <= i;) {
                                    var o = r + i >> 1,
                                        s = n(t, e[o]);
                                    if (s > 0) r = o + 1;
                                    else {
                                        if (!(s < 0)) return o;
                                        i = o - 1
                                    }
                                }
                                return -(r + 1)
                            }(r, {
                                row: t,
                                column: -1
                            }, o.comparePoints);
                            i < 0 && (i = -i - 1), i >= r.length ? i = n > 0 ? 0 : r.length - 1 : 0 === i && n < 0 && (i = r.length - 1);
                            var s = r[i];
                            if (s && n) {
                                if (s.row === t) {
                                    do {
                                        s = r[i += n]
                                    } while (s && s.row === t);
                                    if (!s) return r.slice()
                                }
                                var a = [];
                                t = s.row;
                                do {
                                    a[n < 0 ? "unshift" : "push"](s), s = r[i += n]
                                } while (s && s.row == t);
                                return a.length && a
                            }
                        }
                    }(n, a, t);
                    if (u) {
                        var h = u[0];
                        s.column = (h.pos && "number" != typeof h.column ? h.pos.sc : h.column) || 0, s.row = h.row, c = e.renderer.$gutterLayer.$annotations[s.row]
                    } else {
                        if (l) return;
                        c = {
                            text: ["Looks good!"],
                            className: "ace_ok"
                        }
                    }
                    e.session.unfold(s.row), e.selection.moveToPosition(s);
                    var d = {
                            row: s.row,
                            fixedWidth: !0,
                            coverGutter: !0,
                            el: i.createElement("div"),
                            type: "errorMarker"
                        },
                        f = d.el.appendChild(i.createElement("div")),
                        p = d.el.appendChild(i.createElement("div"));
                    p.className = "error_widget_arrow " + c.className;
                    var g = e.renderer.$cursorLayer.getPixelPosition(s).left;
                    p.style.left = g + e.renderer.gutterWidth - 5 + "px", d.el.className = "error_widget_wrapper", f.className = "error_widget " + c.className, f.innerHTML = c.text.join("<br>"), f.appendChild(i.createElement("div"));
                    var m = function(e, t, n) {
                        if (0 === t && ("esc" === n || "return" === n)) return d.destroy(), {
                            command: "null"
                        }
                    };
                    d.destroy = function() {
                        e.$mouseHandler.isMousePressed || (e.keyBinding.removeKeyboardHandler(m), n.widgetManager.removeLineWidget(d), e.off("changeSelection", d.destroy), e.off("changeSession", d.destroy), e.off("mouseup", d.destroy), e.off("change", d.destroy))
                    }, e.keyBinding.addKeyboardHandler(m), e.on("changeSelection", d.destroy), e.on("changeSession", d.destroy), e.on("mouseup", d.destroy), e.on("change", d.destroy), e.session.widgetManager.addLineWidget(d), d.el.onmousedown = e.focus.bind(e), e.renderer.scrollCursorIntoView(null, .5, {
                        bottom: d.el.offsetHeight
                    })
                }, i.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "")
            }), ace.define("ace/ace", [], function(e, t, r) {
                "use strict";
                e("./lib/fixoldbrowsers");
                var i = e("./lib/dom"),
                    o = e("./lib/event"),
                    s = e("./range").Range,
                    a = e("./editor").Editor,
                    l = e("./edit_session").EditSession,
                    c = e("./undomanager").UndoManager,
                    u = e("./virtual_renderer").VirtualRenderer;
                e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.require = e, t.define = n(21), t.edit = function(e, n) {
                    if ("string" == typeof e) {
                        var r = e;
                        if (!(e = document.getElementById(r))) throw new Error("ace.edit can't find div #" + r)
                    }
                    if (e && e.env && e.env.editor instanceof a) return e.env.editor;
                    var s = "";
                    if (e && /input|textarea/i.test(e.tagName)) {
                        var l = e;
                        s = l.value, e = i.createElement("pre"), l.parentNode.replaceChild(e, l)
                    } else e && (s = e.textContent, e.innerHTML = "");
                    var c = t.createEditSession(s),
                        h = new a(new u(e), c, n),
                        d = {
                            document: c,
                            editor: h,
                            onResize: h.resize.bind(h, null)
                        };
                    return l && (d.textarea = l), o.addListener(window, "resize", d.onResize), h.on("destroy", function() {
                        o.removeListener(window, "resize", d.onResize), d.editor.container.env = null
                    }), h.container.env = h.env = d, h
                }, t.createEditSession = function(e, t) {
                    var n = new l(e, t);
                    return n.setUndoManager(new c), n
                }, t.Range = s, t.Editor = a, t.EditSession = l, t.UndoManager = c, t.VirtualRenderer = u, t.version = t.config.version
            }), ace.require(["ace/ace"], function(n) {
                for (var i in n && (n.config.init(!0), n.define = ace.define), window.ace || (window.ace = n), n) n.hasOwnProperty(i) && (window.ace[i] = n[i]);
                window.ace.default = window.ace, "object" == r(e) && "object" == r(t) && e && (e.exports = window.ace)
            })
        }).call(this, n(8)(e))
    }, , , function(e, t, n) {
        var r, i;

        function o(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    i = !0, o = e
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        r = [n(9)], void 0 === (i = function(e) {
            return {
                getColorScheme: function(e, t) {
                    return this.isDarkTheme(t) ? {
                        cursor: "hsl(".concat(e, ", 70%, 50%)"),
                        labelBackgroundColor: "hsl(".concat(e, ", 70%, 50%)"),
                        highlightBackgroundColor: "hsl(".concat(e, ", 100%, 28%);"),
                        strikeThroughBackgroundColor: "hsl(".concat(e, ", 100%, 20%);"),
                        strikeThroughForegroundColor: "hsl(".concat(e, ", 100%, 60%);")
                    } : {
                        cursor: "hsl(".concat(e, ", 70%, 50%)"),
                        labelBackgroundColor: "hsl(".concat(e, ", 70%, 50%)"),
                        highlightBackgroundColor: "hsl(".concat(e, ", 70%, 85%);"),
                        strikeThroughBackgroundColor: "hsl(".concat(e, ", 70%, 95%);"),
                        strikeThroughForegroundColor: "hsl(".concat(e, ", 70%, 40%);")
                    }
                },
                isDarkTheme: function(e) {
                    var t = e.find(".ace_editor").css("background-color"),
                        n = o(Array.from(t.match(/rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)/)), 4),
                        r = (n[0], n[1]),
                        i = n[2],
                        s = n[3];
                    return (r = parseInt(r, 10)) + (i = parseInt(i, 10)) + (s = parseInt(s, 10)) < 384
                },
                OWN_HUE: 200,
                ANONYMOUS_HUE: 100,
                getHueForUserId: function(e) {
                    return null == e || "anonymous-user" === e ? this.ANONYMOUS_HUE : window.user.id === e ? this.OWN_HUE : (hue = this.getHueForId(e), hue > this.OWNER_HUE - 20 && (hue += 40), hue)
                },
                getHueForTagId: function(e) {
                    return this.getHueForId(e)
                },
                getHueForId: function(t) {
                    var n = e(t);
                    return parseInt(n.toString().slice(0, 8), 16) % 320
                }
            }
        }.apply(t, r)) || (e.exports = i)
    }, , , , , function(e, t, n) {
        var r;
        void 0 === (r = function() {
            return function(e) {
                if (null == e) return "Anonymous";
                if (e.id === window.user.id) return "you";
                if (null != e.name) return e.name;
                var t = [e.first_name, e.last_name].filter(function(e) {
                    return null != e
                }).join(" ").trim();
                return "" === t && (t = e.email.split("@")[0]), null == t || "" === t ? "?" : t
            }
        }.apply(t, [])) || (e.exports = r)
    }, function(e, t, n) {
        var r;

        function i(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
            }(e) || function(e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function o(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    i = !0, o = e
                } finally {
                    try {
                        r || null == a.return || a.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function s(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        void 0 === (r = function() {
            return function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e)
                }
                var t, n, r;
                return t = e, (n = [{
                    key: "on",
                    value: function(e, t) {
                        var n;
                        this.events || (this.events = {});
                        var r = o(Array.from(e.split(".")), 2);
                        return e = r[0], n = r[1], this.events[e] || (this.events[e] = []), this.events[e].push({
                            callback: t,
                            namespace: n
                        })
                    }
                }, {
                    key: "off",
                    value: function(e) {
                        if (this.events || (this.events = {}), null != e) {
                            var t, n = o(Array.from(e.split(".")), 2);
                            if (e = n[0], null == (t = n[1])) return delete this.events[e];
                            for (var r = [], i = 0, s = Array.from(this.events[e] || []); i < s.length; i++) {
                                var a = s[i];
                                a.namespace !== t && r.push(a)
                            }
                            return this.events[e] = r
                        }
                        return this.events = {}
                    }
                }, {
                    key: "trigger",
                    value: function(e) {
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                        return this.events || (this.events = {}), Array.from(this.events[e] || []).map(function(e) {
                            return e.callback.apply(e, i(Array.from(n || [])))
                        })
                    }
                }, {
                    key: "emit",
                    value: function() {
                        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                        return this.trigger.apply(this, i(Array.from(t || [])))
                    }
                }]) && s(t.prototype, n), r && s(t, r), e
            }()
        }.apply(t, [])) || (e.exports = r)
    }, , function(e, t, n) {
        var r, i;
        r = [n(44), n(45), n(46), n(47), n(23), n(48), n(49), n(50), n(18), n(51), n(52)], void 0 === (i = function() {}.apply(t, r)) || (e.exports = i)
    }, function(e, t) {
        angular.module("localStorage", []).value("localStorage", function() {
            try {
                var e;
                return (e = $).localStorage.apply(e, arguments)
            } catch (e) {
                return console.error("localStorage exception", e), null
            }
        })
    }, , , function(e, t, n) {
        var r, i;

        function o(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
            }(e) || function(e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        r = [n(0)], void 0 === (i = function(e) {
            return e.factory("queuedHttp", ["$http", "$q", function(e, t) {
                var n = [],
                    r = !1,
                    i = function e() {
                        if (!r) {
                            var t = n.shift();
                            return null != t ? (r = !0, t().then(function() {
                                return r = !1, e()
                            }).catch(function() {
                                return r = !1, e()
                            })) : void 0
                        }
                    },
                    s = function() {
                        for (var t = arguments.length, r = new Array(t), s = 0; s < t; s++) r[s] = arguments[s];
                        var a = {},
                            l = [],
                            c = [];
                        a.then = function(e, t) {
                            return l.push(e), null != t && c.push(t), a
                        }, a.catch = function(e) {
                            return c.push(e), a
                        };
                        var u = function() {
                            return e.apply(void 0, o(Array.from(r || []))).then(function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return Array.from(l).map(function(e) {
                                    return e.apply(void 0, o(Array.from(t || [])))
                                })
                            }).catch(function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return Array.from(c).map(function(e) {
                                    return e.apply(void 0, o(Array.from(t || [])))
                                })
                            })
                        };
                        return n.push(u), i(), a
                    };
                return s.post = function(e, t) {
                    return s({
                        method: "POST",
                        url: e,
                        data: t
                    })
                }, s
            }])
        }.apply(t, r)) || (e.exports = i)
    }, function(e, t, n) {
        var r, i;
        r = [n(0)], void 0 === (i = function(e) {
            return e.directive("mathjax", ["$compile", "$parse", function(e, t) {
                return {
                    link: function(n, r, i) {
                        if (MathJax && MathJax.Hub) {
                            if (!t(i.mathjaxAllowHtml)(n)) {
                                var o = r.html(),
                                    s = e("<span ng-non-bindable></span>")({});
                                r.html("").append(s), s.html(o)
                            }
                            if ("no-single-dollar" !== i.delimiter) {
                                var a = MathJax.Hub.config && MathJax.Hub.config.tex2jax.inlineMath;
                                _.find(a, function(e) {
                                    return "$" === e[0] && "$" === e[1]
                                }) || MathJax.Hub.Config({
                                    tex2jax: {
                                        inlineMath: a.concat([
                                            ["$", "$"]
                                        ])
                                    }
                                })
                            }
                            setTimeout(function() {
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub, r.get(0)])
                            }, 0)
                        }
                    }
                }
            }])
        }.apply(t, r)) || (e.exports = i)
    }, function(e, t) {
        e.exports = function() {
            throw new Error("define cannot be used indirect")
        }
    }, function(e, t, n) {
        var r;
        void 0 === (r = function() {
            var e;
            return e = {
                rangeToShareJs: function(e, t) {
                    for (var n = 0, r = 0; r < t.length; r++) {
                        var i = t[r];
                        n += r < e.row ? i.length : e.column
                    }
                    return n += e.row
                },
                changeToShareJs: function(t, n) {
                    var r = e.rangeToShareJs(t.start, n),
                        i = t.lines.join("\n");
                    switch (t.action) {
                        case "insert":
                            return {
                                i: i,
                                p: r
                            };
                        case "remove":
                            return {
                                d: i,
                                p: r
                            };
                        default:
                            throw new Error("unknown action: ".concat(t.action))
                    }
                },
                shareJsOffsetToRowColumn: function(e, t) {
                    var n = 0;
                    for (n = 0; n < t.length; n++) {
                        if (e <= t[n].length) break;
                        e -= t[n].length + 1
                    }
                    return {
                        row: n,
                        column: e
                    }
                }
            }
        }.apply(t, [])) || (e.exports = r)
    }, , function(e, t) {