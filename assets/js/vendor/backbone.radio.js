!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],n):(e.Backbone=e.Backbone||{},e.Backbone.Radio=n(e._,e.Backbone))}(this,function(e,n){"use strict";function t(e,n,t,r){var o=e[n];if(!(t&&t!==o.callback&&t!==o.callback._callback||r&&r!==o.context))return delete e[n],!0}function r(n,r,o,i){n||(n={});for(var s=r?[r]:e.keys(n),u=!1,c=0,a=s.length;c<a;c++)r=s[c],n[r]&&t(n,r,o,i)&&(u=!0);return u}function o(n){return l[n]||(l[n]=e.bind(c.log,c,n))}function i(n){return e.isFunction(n)?n:function(){return n}}e="default"in e?e.default:e,n="default"in n?n.default:n;var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},u=n.Radio,c=n.Radio={};c.VERSION="2.0.0",c.noConflict=function(){return n.Radio=u,this},c.DEBUG=!1,c._debugText=function(e,n,t){return e+(t?" on the "+t+" channel":"")+': "'+n+'"'},c.debugLog=function(e,n,t){c.DEBUG&&console&&console.warn&&console.warn(c._debugText(e,n,t))};var a=/\s+/;c._eventsApi=function(n,t,r,o){if(!r)return!1;var i={};if("object"===("undefined"==typeof r?"undefined":s(r))){for(var u in r){var c=n[t].apply(n,[u,r[u]].concat(o));a.test(u)?e.extend(i,c):i[u]=c}return i}if(a.test(r)){for(var l=r.split(a),f=0,h=l.length;f<h;f++)i[l[f]]=n[t].apply(n,[l[f]].concat(o));return i}return!1},c._callHandler=function(e,n,t){var r=t[0],o=t[1],i=t[2];switch(t.length){case 0:return e.call(n);case 1:return e.call(n,r);case 2:return e.call(n,r,o);case 3:return e.call(n,r,o,i);default:return e.apply(n,t)}};var l={};e.extend(c,{log:function(n,t){if("undefined"!=typeof console){var r=e.toArray(arguments).slice(2);console.log("["+n+'] "'+t+'"',r)}},tuneIn:function(e){var n=c.channel(e);return n._tunedIn=!0,n.on("all",o(e)),this},tuneOut:function(e){var n=c.channel(e);return n._tunedIn=!1,n.off("all",o(e)),delete l[e],this}}),c.Requests={request:function(n){var t=e.toArray(arguments).slice(1),r=c._eventsApi(this,"request",n,t);if(r)return r;var o=this.channelName,i=this._requests;if(o&&this._tunedIn&&c.log.apply(this,[o,n].concat(t)),i&&(i[n]||i.default)){var s=i[n]||i.default;return t=i[n]?t:arguments,c._callHandler(s.callback,s.context,t)}c.debugLog("An unhandled request was fired",n,o)},reply:function(e,n,t){return c._eventsApi(this,"reply",e,[n,t])?this:(this._requests||(this._requests={}),this._requests[e]&&c.debugLog("A request was overwritten",e,this.channelName),this._requests[e]={callback:i(n),context:t||this},this)},replyOnce:function(n,t,r){if(c._eventsApi(this,"replyOnce",n,[t,r]))return this;var o=this,s=e.once(function(){return o.stopReplying(n),i(t).apply(this,arguments)});return this.reply(n,s,r)},stopReplying:function(e,n,t){return c._eventsApi(this,"stopReplying",e)?this:(e||n||t?r(this._requests,e,n,t)||c.debugLog("Attempted to remove the unregistered request",e,this.channelName):delete this._requests,this)}},c._channels={},c.channel=function(e){if(!e)throw new Error("You must provide a name for the channel.");return c._channels[e]?c._channels[e]:c._channels[e]=new c.Channel(e)},c.Channel=function(e){this.channelName=e},e.extend(c.Channel.prototype,n.Events,c.Requests,{reset:function(){return this.off(),this.stopListening(),this.stopReplying(),this}});var f,h,d=[n.Events,c.Requests];return e.each(d,function(n){e.each(n,function(n,t){c[t]=function(n){return h=e.toArray(arguments).slice(1),f=this.channel(n),f[t].apply(f,h)}})}),c.reset=function(n){var t=n?[this._channels[n]]:this._channels;e.each(t,function(e){e.reset()})},c});