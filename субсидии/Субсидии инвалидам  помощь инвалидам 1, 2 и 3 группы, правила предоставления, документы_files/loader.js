!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=22)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r={addContainer:function(t,e,n){var r=document.createElement("div");document.getElementsByTagName("script")[0].parentNode.appendChild(r);var o=function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},a=function t(e,n,r){var a={};return"object"===(void 0===e?"undefined":i(e))?Object.keys(e).map(function(i){Object.assign(a,t(e[i],i,void 0!==n?(void 0!==r?r+"-":"")+o(n):void 0))}):a[(void 0!==r?r+"-":"")+o(n)]=e,a}(e);return r.setAttribute("class",n.WIDGET_CLASS+" "+n.WIDGET_CLASS_AUTOINIT),r.setAttribute("data-widget",t),Object.keys(a).map(function(t){"id"!==t&&r.setAttribute("data-"+t,a[t])}),r},mobileDetect:{Android:function(){return null!==navigator.userAgent.match(/Android/i)},BlackBerry:function(){return null!==navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return null!==navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return null!==navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return null!==navigator.userAgent.match(/IEMobile/i)},any:function(){var t=r.mobileDetect;return t.Android()||t.BlackBerry()||t.iOS()||t.Opera()||t.Windows()}},getTopZIndex:function(t){return Array.from(document.getElementsByTagName("*")).reduce(function(e,n){var i=parseFloat(window.getComputedStyle(n).zIndex);return n!==t&&i>e&&(e=parseFloat(i)),e},-1)},getStyleString:function(t){return Object.keys(t).map(function(e){return e+":"+t[e]}).join(";")},hasMetaTagViewPort:function(){return null!==document.querySelector('meta[name="viewport"]')},log:function(){var t;void 0!==window.console&&void 0!==window.console.info&&(t=window.console).info.apply(t,["Pravoved.ru:"].concat(Array.prototype.slice.call(arguments)))}};e.default=r},function(t,e,n){"use strict";n(2),n(4),n(7)},function(t,e,n){"use strict";n(3)},function(t,e,n){"use strict";var i,r,o,a;!window.addEventListener&&(i=Window.prototype,r=HTMLDocument.prototype,o=Element.prototype,a=[],i.addEventListener=r.addEventListener=o.addEventListener=function(t,e){var n=this;a.unshift([n,t,e,function(t){t.currentTarget=n,t.preventDefault=function(){t.returnValue=!1},t.stopPropagation=function(){t.cancelBubble=!0},t.target=t.srcElement||n,e.call(n,t)}]),this.attachEvent("on"+t,a[0][3])},i.removeEventListener=r.removeEventListener=o.removeEventListener=function(t,e){for(var n,i=0;n=a[i];++i)if(n[0]==this&&n[1]==t&&n[2]==e)return this.detachEvent("on"+t,a.splice(i,1)[0][3])},i.dispatchEvent=r.dispatchEvent=o.dispatchEvent=function(t){return this.fireEvent("on"+t.type,t)})},function(t,e,n){"use strict";n(5),n(6)},function(t,e,n){"use strict";Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(t,e){if(null==t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),i=1;i<arguments.length;i++){var r=arguments[i];if(null!=r)for(var o=Object.keys(Object(r)),a=0,s=o.length;a<s;a++){var u=o[a],l=Object.getOwnPropertyDescriptor(r,u);void 0!==l&&l.enumerable&&(n[u]=r[u])}}return n}})},function(t,e,n){"use strict";if(!(document.documentElement.dataset||Object.getOwnPropertyDescriptor(HTMLElement.prototype,"dataset")&&Object.getOwnPropertyDescriptor(HTMLElement.prototype,"dataset").get)){var i={enumerable:!0,get:function(){var t={},e=this.attributes;function n(t){return t.charAt(1).toUpperCase()}function r(){return this.value}function o(t,e){void 0!==e?this.setAttribute(t,e):this.removeAttribute(t)}for(var a=0;a<e.length;a+=1){var s=e[a];if(s&&s.name&&/^data-\w[\w-]*$/.test(s.name)){var u=s.name,l=s.value,c=u.substr(5).replace(/-./g,n);Object.defineProperty(t,c,{enumerable:i.enumerable,get:r.bind({value:l||""}),set:o.bind(this,u)})}}return t}};Object.defineProperty(HTMLElement.prototype,"dataset",i)}},function(t,e,n){"use strict";n(8)},function(t,e,n){"use strict";var i,r,o,a;Array.from||(Array.from=(i=Object.prototype.toString,r=function(t){return"function"==typeof t||"[object Function]"===i.call(t)},o=Math.pow(2,53)-1,a=function(t){var e=function(t){var e=Number(t);return isNaN(e)?0:0!==e&&isFinite(e)?(e>0?1:-1)*Math.floor(Math.abs(e)):e}(t);return Math.min(Math.max(e,0),o)},function(t){var e=Object(t);if(null==t)throw new TypeError("Array.from requires an array-like object - not null or undefined");var n,i=arguments.length>1?arguments[1]:void 0;if(void 0!==i){if(!r(i))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(n=arguments[2])}for(var o,s=a(e.length),u=r(this)?Object(new this(s)):new Array(s),l=0;l<s;)o=e[l],u[l]=i?void 0===n?i(o,l):i.call(n,o,l):o,l+=1;return u.length=s,u}))},,,,,,,,,,,,,,function(t,e,n){"use strict";var i,r,o=s(n(0)),a=s(n(23));function s(t){return t&&t.__esModule?t:{default:t}}n(1),i=Object.assign({},{REACT_APP_DOMAIN:("https"===String(window.location).substr(0,5)?"https":"http")+"://widget.cpa.legalaxy.com",WIDGETS:{chat:"/widget-chat.html","inline-form":"/widget-inline-form.html"},LOADER_CLASS:"pravoved-ru-loader",WIDGET_CLASS:"pravoved-ru-widget",WIDGET_CLASS_AUTOINIT:"pravoved-ru-widget--auto",DEFAULT_APP:"chat"},void 0!==window.PRAVOVED_CONFIG?window.PRAVOVED_CONFIG:{}),r=a.default.create({CONFIG:i}).initContainers(i.WIDGET_CLASS_AUTOINIT),window.PRAVOVED={widgets:{questionChat:function(t){var e=r.addContainer("chat",t);return r.initContainers(i.WIDGET_CLASS_AUTOINIT),e}},start:function(){r.initContainers(i.WIDGET_CLASS)},destroy:function(){r.destroy()},widget:function(t){return t?{start:function(){r.start(t)},destroy:function(){r.destroy(t)},on:function(e,n){r.on(t,e,n)},off:function(e,n){r.off(t,e,n)}}:(o.default.log("Undefined container",t),{on:function(){}})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=s(n(24)),a=s(n(0));function s(t){return t&&t.__esModule?t:{default:t}}var u=function(){function t(e){var n=e.CONFIG;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.CONFIG=n,this.containers=[]}return r(t,null,[{key:"create",value:function(){return new(Function.prototype.bind.apply(t,[null].concat(Array.prototype.slice.call(arguments))))}}]),r(t,[{key:"addContainer",value:function(t,e){var n=document.createElement("div");document.body.appendChild(n);var r=function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},o=function t(e,n,o){var a={};return"object"===(void 0===e?"undefined":i(e))?Object.keys(e).map(function(i){Object.assign(a,t(e[i],i,void 0!==n?(void 0!==o?o+"-":"")+r(n):void 0))}):a[(void 0!==o?o+"-":"")+r(n)]=e,a}(e);return n.setAttribute("class",this.CONFIG.WIDGET_CLASS+" "+this.CONFIG.WIDGET_CLASS_AUTOINIT),n.setAttribute("data-widget",t),Object.keys(o).map(function(t){"id"!==t&&n.setAttribute("data-"+t,o[t])}),n}},{key:"initContainers",value:function(t){var e=this,n=document.getElementsByClassName(t);return Array.from(n).map(function(t){e.initContainer(t)}),this}},{key:"initContainer",value:function(t){if(void 0!==t){var e=this.getUniqueId();t.style.cssText="display:block;width:1px;height:1px;top:-99999px;left:-99999px",t.setAttribute("data-id",e);var n=t.dataset.widget;if(""!==n&&void 0!==this.CONFIG.WIDGETS[n]){var i=(void 0!==t.dataset.reactAppDomain&&""!==t.dataset.reactAppDomain?t.dataset.reactAppDomain:this.CONFIG.REACT_APP_DOMAIN)+this.CONFIG.WIDGETS[t.dataset.widget],r={initParams:t.dataset,CONFIG:this.CONFIG,appUrl:i,elt:t};return this.containers[e]={elt:t,loader:o.default.create(r).run()},this}a.default.log("Undefined widget type "+t.dataset.widget+", check data-widget attribute, container skipped.")}else a.default.log("Undefined widget DOM container: "+t)}},{key:"on",value:function(t,e,n){var i=this.getContainerByElt(t);return null!==i&&i.loader.on(e,n),this}},{key:"off",value:function(t,e,n){var i=this.getContainerByElt(t);return null!==i&&i.loader.off(e,n),this}},{key:"getContainerByElt",value:function(t){var e=t.getAttribute("data-id");return""!==e&&void 0!==this.containers[e]?this.containers[e]:null}},{key:"start",value:function(t){this.destroy(t),this.initContainer(t)}},{key:"destroy",value:function(t){var e=this;Object.keys(this.containers).map(function(n){(void 0===t||e.containers[n]&&e.containers[n].elt===t)&&void 0!==e.containers[n].loader&&(e.containers[n].loader.destroy(),e.containers[n]=null)})}},{key:"getUniqueId",value:function(){return this.CONFIG.WIDGET_CLASS+(new Date).getMilliseconds()+String(Math.random()).split(".")[1]}}]),t}();e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(25),o=u(n(0)),a=u(n(26)),s=u(n(27));function u(t){return t&&t.__esModule?t:{default:t}}var l=function(){function t(e){var n=e.initParams,i=e.elt,r=(e.CONFIG,e.appUrl);!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.window=window,this.body=document.getElementsByTagName("body")[0],this.html=document.getElementsByTagName("html")[0],this.initParams=n,this.currentStyle={},this.events={},this.widgetType=n.widget,this.wrapper=i,this.currentState=-1,this.appUrl=r}return i(t,null,[{key:"create",value:function(){return new(Function.prototype.bind.apply(t,[null].concat(Array.prototype.slice.call(arguments))))}}]),i(t,[{key:"destroy",value:function(){this.initParams.id;this.trigger("destroy"),this.releaseScroll()}},{key:"run",value:function(){return this.canRun()&&this.initHtml().initEvents().initCounters(),this}},{key:"canRun",value:function(){var t=this;return"true"===this.initParams.disableMobile&&o.default.mobileDetect.any()?(o.default.log("Widget "+this.widgetType+" disabled for mobile"),!1):"true"!==this.initParams.disableDesktop||o.default.mobileDetect.any()?0===r.PARAMS.required.reduce(function(e,n){return void 0===t.initParams[n]&&(o.default.log("Widget must have "+n+" value"),e.push(1)),e},[]).length:(o.default.log("Widget "+this.widgetType+" disabled for desktop"),!1)}},{key:"initHtml",value:function(){var t=this;this.initParams.id;return this.state(r.STATES.HIDDEN),this.iframe=document.createElement("iframe"),this.iframe.border=0,this.iframe.width="100%",this.iframe.height="100%",this.iframe.scrolling="no",this.iframe.seamless="yes",this.iframe.style.cssText="position:absolute;top:0;left:0;right:0;bottom:0;display:block;width:100%;height:100%;margin:0;padding:0;border:none;overflow:hidden;",this.wrapper.appendChild(this.iframe),this.iframe.src="about:blank",this.iframe.contentWindow.location=this.getWidgetUrl(),this.on("destroy",function(){t.iframe.remove(),delete t.iframe,t.wrapper.dataset.id="",t.wrapper.dataset.viewportContent="",t.wrapper.innerHTML="",t.wrapper.style=""}),this}},{key:"initEvents",value:function(){var t=this,e=this.initParams.forcePop,n=function(e){t.windowMessageHandler(e)};return this.window.addEventListener("message",n),void 0!==e&&"default"!==e&&(this.forcePopInterval=setInterval(function(){t.updateWrapper()},250)),this.on("destroy",function(){t.window.removeEventListener("message",n),void 0!==t.forcePopInterval&&clearInterval(t.forcePopInterval)}),this}},{key:"initCounters",value:function(){return this.initYandexCounter(),this.initGoogleCounter(),this}},{key:"initYandexCounter",value:function(){var t=this;if(void 0===this.initParams.yandexCounter||null===this.initParams.yandexCounter||""===this.initParams.yandexCounter)return this;this.yaCounter=a.default.create(this.initParams.yandexCounter),Object.keys(r.widget2CounterEventsMap).map(function(e){var n=r.widget2CounterEventsMap[e];t.on(e,function(){t.yaCounter.reachGoal(n)})}),this.on("destroy",function(){t.yaCounter.destroy()})}},{key:"initGoogleCounter",value:function(){var t=this;if(void 0===this.initParams.googleCounter||"auto"!==this.initParams.googleCounter)return this;this.googleCounter=s.default.create(),Object.keys(r.widget2CounterEventsMap).map(function(e){var n=r.widget2CounterEventsMap[e];t.on(e,function(){t.googleCounter.reachGoal(n)})}),this.on("destroy",function(){t.googleCounter.destroy()})}},{key:"windowMessageHandler",value:function(t){var e=this.initParams.id;if(t.data&&t.data.widgetId===e)switch(t.data.type){case"exec":new Function(["params"],"return ("+t.data.message+").apply(this, [params]);").apply(this,[{iframe:this.iframe,wrapper:this.wrapper}]);break;case"trigger":this.trigger(t.data.message);break;case"setCss":this.css(t.data.message);break;case"setState":this.state(t.data.message)}}},{key:"getWidgetUrl",value:function(){var t=this,e=this.initParams,n=e.id,i=e.partnerId,a=o.default.mobileDetect.any()?"mobile":"desktop",s={id:n,partnerId:i},u={pageUrl:String(this.window.location),hasMetaTagViewPort:o.default.hasMetaTagViewPort(),width:this.window.innerWidth,height:this.window.innerHeight};return r.PARAMS.optional.map(function(e){void 0!==t.initParams[e]&&null!==t.initParams[e]&&""!==t.initParams[e]&&(u[e]=t.initParams[e])}),r.PARAMS.overridable.map(function(e){var n=a+String(e)[0].toLocaleUpperCase()+String(e).substr(1,String(e).length);void 0!==t.initParams[n]&&null!==t.initParams[n]&&""!==t.initParams[n]&&(u[e]=t.initParams[n])}),s.settings=JSON.stringify(u),this.appUrl+"?"+Object.keys(s).reduce(function(t,e){var n=s[e];return t.push(encodeURIComponent(e)+"="+encodeURIComponent(n)),t},[]).join("&")}},{key:"state",value:function(t){return void 0===t?this.currentState:t===this.currentState?this:(t===r.STATES.FULLSCREEN&&this.freezeScroll(),this.currentState=t,this.updateWrapper(),void(t!==r.STATES.FULLSCREEN&&this.releaseScroll()))}},{key:"updateWrapper",value:function(){this.wrapper.style.cssText=this.getCssText()}},{key:"css",value:function(t){if(void 0===t)return this.currentStyle;this.currentStyle=Object.assign({},this.currentStyle,t),this.updateWrapper()}},{key:"getCssText",value:function(){var t=Object.assign({},this.currentStyle);switch(this.state()){case r.STATES.HIDDEN:Object.assign(t,r.STYLES[this.widgetType].hidden);break;case r.STATES.FULLSCREEN:Object.assign(t,r.STYLES[this.widgetType].fullscreen);break;default:Object.assign(t,r.STYLES[this.widgetType].initial)}if("chat"===this.widgetType&&(t["z-index"]=o.default.getTopZIndex(this.wrapper)+10,this.state()!==r.STATES.FULLSCREEN)){var e=o.default.mobileDetect.any()?"mobile":"desktop",n=void 0!==this.initParams[e+"Position"]?this.initParams[e+"Position"]:void 0!==this.initParams.position&&"left"===this.initParams.position?"left":"right";Object.assign(t,"left"===n?r.STYLES[this.widgetType]["position-left"]:r.STYLES[this.widgetType]["position-right"]),!o.default.mobileDetect.any()&&void 0!==this.initParams.offsetSide&&Math.abs(parseInt(this.initParams.offsetSide))>0&&(t[n]=parseInt(this.initParams.offsetSide)+"px"),!o.default.mobileDetect.any()&&void 0!==this.initParams.offsetBottom&&Math.abs(parseInt(this.initParams.offsetBottom))>0&&(t.bottom=parseInt(this.initParams.offsetBottom)+"px")}return o.default.getStyleString(t)}},{key:"fixViewport",value:function(){var t=document.querySelector("meta[name=viewport]");null===t?((t=document.createElement("meta")).name="viewport",t.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",document.getElementsByTagName("head")[0].appendChild(t),this.wrapper.dataset.viewportContent=""):this.wrapper.dataset.viewportContent=t.getAttribute("content"),t.setAttribute("content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")}},{key:"revertViewport",value:function(){var t=document.querySelector("meta[name=viewport]"),e=this.wrapper.dataset.viewportContent;""===e?t.parent.removeChild(t):t.setAttribute("content",e)}},{key:"releaseScroll",value:function(){if("1"===this.wrapper.dataset.freezed){var t=this.wrapper;this.body.style.cssText=t.dataset.bodyCssText,this.html.style.cssText=t.dataset.htmlCssText,this.window.scrollTo(t.dataset.scrollLeft,t.dataset.scrollTop)}}},{key:"freezeScroll",value:function(){var t=this.body,e=this.html,n=this.wrapper;n.dataset.freezed="1",n.dataset.scrollTop=t.scrollTop||e.scrollTop,n.dataset.scrollLeft=t.scrollLeft||e.scrollLeft,n.dataset.bodyCssText=t.style.cssText,n.dataset.htmlCssText=e.style.cssText,t.style.overflow="hidden",t.style.position="fixed",t.style.padding="0",t.style.margin="0",t.style.left="0px",t.style.right="0px",t.style.width="100%",t.style.height="100%",e.style.overflow="hidden",e.style.position="fixed"}},{key:"on",value:function(t,e){void 0===this.events[t]&&(this.events[t]=[]),this.events[t].push(e)}},{key:"off",value:function(t,e){if(void 0!==this.events[t])if(void 0===e)delete this.events[t];else{var n=this.events[t];this.events[t]=n.reduce(function(t,n){return n!==e&&t.push(n),t},[])}}},{key:"trigger",value:function(t){var e=this;void 0!==this.events[t]&&this.events[t].map(function(t){t.apply(e,[])})}}]),t}();e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.STATES={VISIBLE:"visible",HIDDEN:"hidden",FULLSCREEN:"fullscreen"},e.STYLES={chat:{hidden:{width:0,height:0,opacity:0},initial:{display:"block",position:"fixed",overflow:"hidden",bottom:0,background:"transparent"},"position-right":{right:0,left:"auto"},"position-left":{left:0,right:"auto"},fullscreen:{position:"fixed",width:"100%",height:"100%",padding:0,bottom:0,left:0,right:0,top:0,background:"rgba(255,255,255,0.95)"}},"inline-form":{hidden:{width:"1px",height:"1px",opacity:0,position:"relative"},initial:{width:"100%",minHeight:"1px",opacity:1,display:"block",position:"relative",overflow:"hidden",background:"transparent"}}},e.PARAMS={required:["partnerId","widget"],optional:["restDomain","pollingDomain","forcePop","chan","data1","data2","theme","themeCustom","themeCustomColor1","themeCustomColor2","operatorDescription","operatorAvatar","operatorName","operatorSurname","themeCustomText","themeCustomTextInverted","themeCustomBackground","themeCustomDirection","behavior","versionClient","startOnDialogOpen","disableMobile","disableDesktop","disableDialog","position","offsetSide","offsetBottom","mobileForceExternal","yandexCounter","googleCounter","popupDelay"],overridable:["chan","data1","data2","theme","themeCustom","themeCustomColor1","themeCustomColor2","operatorDescription","operatorAvatar","operatorName","operatorSurname","themeCustomText","themeCustomTextInverted","themeCustomBackground","themeCustomDirection","behavior","versionClient","startOnDialogOpen","position","offsetSide","offsetBottom","disableDialog","popupDelay"]},e.widget2CounterEventsMap={"chat.start":"PRAVOVED.chat.show-widget","chat.dialog.open":"PRAVOVED.chat.open-dialog","chat.form.open":"PRAVOVED.chat.show-form","chat.form.send":"PRAVOVED.chat.click-button","chat.form.success":"PRAVOVED.chat.lead-send","inline-form.start":"PRAVOVED.inline-form.show-widget","inline-form.send":"PRAVOVED.inline-form.click-button","inline-form.success":"PRAVOVED.inline-form.lead-send"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),a=(i=o)&&i.__esModule?i:{default:i};var s=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.queue=[],this.queueInterval=setInterval(function(){if(n.countersList=n.getInstalledCounters(e),n.queue.length>0){var t=n.queue.shift();n.countersList.map(function(e){n.getCounter(e).reachGoal(t)})}},1e3)}return r(t,null,[{key:"create",value:function(){return new(Function.prototype.bind.apply(t,[null].concat(Array.prototype.slice.call(arguments))))}}]),r(t,[{key:"reachGoal",value:function(t){this.queue.push(t)}},{key:"destroy",value:function(){clearInterval(this.queueInterval)}},{key:"getCounter",value:function(t,e){var n=this,i=void 0===e?0:e;return void 0!==window["yaCounter"+t]&&"function"==typeof window["yaCounter"+t].reachGoal?window["yaCounter"+t]:{reachGoal:function(e){i>10?a.default.log("Yandex counter "+t+" is not accessible, skipping goal "+e):setTimeout(function(){i++,n.getCounter(t,i).reachGoal(e)},100)}}}},{key:"getInstalledCounters",value:function(t){return"auto"===t?Object.keys(window).reduce(function(t,e){return"yaCounter"===e.substr(0,9)&&t.push(e.replace("yaCounter","")),t},[]):t.indexOf(",")>-1?String(t).split(",").reduce(function(t,e){return t.push(String(e).trim()),t},[]):[t]}}]),t}();e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),a=(i=o)&&i.__esModule?i:{default:i};var s=function(){function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.queue=[],this.queueInterval=setInterval(function(){if(e.queue.length>0){var t=e.queue.shift();e.getCounter().reachGoal(t)}},1e3)}return r(t,null,[{key:"create",value:function(){return new(Function.prototype.bind.apply(t,[null].concat(Array.prototype.slice.call(arguments))))}}]),r(t,[{key:"destroy",value:function(){clearInterval(this.queueInterval)}},{key:"reachGoal",value:function(t){this.queue.push(t)}},{key:"getCounter",value:function(t){var e=this,n=void 0===t?0:t;return void 0!==window.ga?{reachGoal:function(t){var e=t.split(".");window.ga("send",{hitType:"event",eventCategory:e[0],eventLabel:e[1],eventAction:e[2]})}}:{reachGoal:function(t){n>10?a.default.log("GA counter is not accessible, skiping goal "+t):setTimeout(function(){n++,e.getCounter(n).reachGoal(t)},100)}}}}]),t}();e.default=s}]);