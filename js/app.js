"use strict";function _typeof2(e){return _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof2(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _typeof="function"==typeof Symbol&&"symbol"==_typeof2(Symbol.iterator)?function(e){return _typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":_typeof2(e)};!function(){for(var e=["DocumentType","Element","CharacterData"],t=function(){null!=this.parentNode&&this.parentNode.removeChild(this)},r=0;r<e.length;r++){var i=e[r];window[i]&&!window[i].prototype.remove&&(window[i].prototype.remove=t)}}(),function(e){function t(){}function r(e){if("object"!==_typeof(this))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function i(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void r._immediateFn((function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null!==r){var i;try{i=r(e._value)}catch(e){return void o(t.promise,e)}n(t.promise,i)}else(1===e._state?n:o)(t.promise,e._value)})))}function n(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":_typeof(t))||"function"==typeof t)){var i=t.then;if(t instanceof r)return e._state=3,e._value=t,void s(e);if("function"==typeof i)return void l(function(e,t){return function(){e.apply(t,arguments)}}(i,t),e)}e._state=1,e._value=t,s(e)}catch(t){o(e,t)}}function o(e,t){e._state=2,e._value=t,s(e)}function s(e){2===e._state&&0===e._deferreds.length&&r._immediateFn((function(){e._handled||r._unhandledRejectionFn(e._value)}));for(var t=0,n=e._deferreds.length;t<n;t++)i(e,e._deferreds[t]);e._deferreds=null}function a(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function l(e,t){var r=!1;try{e((function(e){r||(r=!0,n(t,e))}),(function(e){r||(r=!0,o(t,e))}))}catch(e){if(r)return;r=!0,o(t,e)}}var u=setTimeout;r.prototype.catch=function(e){return this.then(null,e)},r.prototype.then=function(e,r){var n=new this.constructor(t);return i(this,new a(e,r,n)),n},r.all=function(e){var t=Array.prototype.slice.call(e);return new r((function(e,r){function i(o,s){try{if(s&&("object"===(void 0===s?"undefined":_typeof(s))||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,(function(e){i(o,e)}),r)}t[o]=s,0==--n&&e(t)}catch(e){r(e)}}if(0===t.length)return e([]);for(var n=t.length,o=0;o<t.length;o++)i(o,t[o])}))},r.resolve=function(e){return e&&"object"===(void 0===e?"undefined":_typeof(e))&&e.constructor===r?e:new r((function(t){t(e)}))},r.reject=function(e){return new r((function(t,r){r(e)}))},r.race=function(e){return new r((function(t,r){for(var i=0,n=e.length;i<n;i++)e[i].then(t,r)}))},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){u(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},r._setImmediateFn=function(e){r._immediateFn=e},r._setUnhandledRejectionFn=function(e){r._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=r:e.Promise||(e.Promise=r)}(window),function(e){e.Promise||(e.Promise=Promise);var t="required",r="email",i="minLength",n="maxLength",o="password",s="phone",a="remote",l="strength",u="function",c=function(e,t){if("string"==typeof e)return e;var r="post"===t.toLowerCase()?"":"?";return Array.isArray(e)?r+e.map((function(e){return e.name+"="+e.value})).join("&"):r+Object.keys(e).map((function(t){return t+"="+e[t]})).join("&")},d=function(e){var t=e.url,r=e.method,i=e.data,n=e.debug,o=e.callback,s=e.error;if(n)o("test");else{var a=!1!==e.async,l=new XMLHttpRequest,u=c(i,"get"),d=null;"post"===r.toLowerCase()&&(d=c(i,"post"),u=""),l.open(r,t+u,a),l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){4===this.readyState&&(200===this.status?o(this.responseText):s&&s(this.responseText))},l.send(d)}},f=function(e,t){this.options=t||{},this.rules=this.options.rules||{},this.messages=this.options.messages||void 0,this.colorWrong=this.options.colorWrong||"#B81111",this.result={},this.elements=[],this.tooltip=this.options.tooltip||{},this.tooltipFadeOutTime=this.tooltip.fadeOutTime||5e3,this.tooltipFadeOutClass=this.tooltip.fadeOutClass||"just-validate-tooltip-hide",this.tooltipSelectorWrap=document.querySelectorAll(this.tooltip.selectorWrap).length?document.querySelectorAll(this.tooltip.selectorWrap):document.querySelectorAll(".just-validate-tooltip-container"),this.bindHandlerKeyup=this.handlerKeyup.bind(this),this.submitHandler=this.options.submitHandler||void 0,this.invalidFormCallback=this.options.invalidFormCallback||void 0,this.promisesRemote=[],this.isValidationSuccess=!1,this.focusWrongField=this.options.focusWrongField||!1,this.REGEXP={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,zip:/^\d{5}(-\d{4})?$/,phone:/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,password:/[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,strengthPass:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/},this.DEFAULT_REMOTE_ERROR="Error",this.state={tooltipsTimer:null},this.setForm(document.querySelector(e))};f.prototype={defaultRules:{email:{required:!0,email:!0},name:{required:!0,minLength:3,maxLength:15},text:{required:!0,maxLength:300,minLength:5},password:{required:!0,password:!0,minLength:4,maxLength:8},zip:{required:!0,zip:!0},phone:{phone:!0}},defaultMessages:{required:"The field is required",email:"Please, type a valid email",maxLength:"The field must contain a maximum of :value characters",minLength:"The field must contain a minimum of :value characters",password:"Password is not valid",remote:"Email already exists",strength:"Password must contents at least one uppercase letter, one lowercase letter and one number",function:"Function returned false"},handlerKeyup:function(e){var t=e.target,r={name:t.getAttribute("data-validate-field"),value:t.value};delete this.result[r.name],this.validateItem({name:r.name,value:r.value,group:[],isKeyupChange:!0}),this.renderErrors()},setterEventListener:function(e,t,r,i){switch("keyup"===t&&(r=this.bindHandlerKeyup),i){case"add":e.addEventListener(t,r);break;case"remove":e.removeEventListener(t,r)}},getElementsRealValue:function(){for(var e=this.$form.querySelectorAll("*"),t=void 0,r={},i=0,n=e.length;i<n;++i)if(t=e[i].getAttribute("name")){if("checkbox"===e[i].type){r[t]=e[i].checked;continue}r[t]=e[i].value}return r},validationFailed:function(){this.invalidFormCallback&&this.invalidFormCallback(this.result);var e=document.querySelector(".js-validate-error-field");this.focusWrongField&&e&&e.focus&&e.focus()},validationSuccess:function(){if(0===Object.keys(this.result).length){if(this.isValidationSuccess=!1,this.submitHandler){var e=this.getElementsRealValue();return void this.submitHandler(this.$form,e,d)}this.$form.submit()}},setForm:function(e){var t=this;this.$form=e,this.$form.setAttribute("novalidate","novalidate"),this.$form.addEventListener("submit",(function(e){return e.preventDefault(),t.result=[],t.getElements(),t.promisesRemote.length?void Promise.all(t.promisesRemote).then((function(){t.promisesRemote=[],t.isValidationSuccess?t.validationSuccess():t.validationFailed()})):void(t.isValidationSuccess?t.validationSuccess():t.validationFailed())}))},isEmail:function(e){return this.REGEXP.email.test(e)},isZip:function(e){return this.REGEXP.zip.test(e)},isPhone:function(e){return this.REGEXP.phone.test(e)},isPassword:function(e){return this.REGEXP.password.test(e)},isEmpty:function(e){var t=e;return e.trim&&(t=e.trim()),!t},checkLengthMax:function(e,t){return e.length<=t},checkLengthMin:function(e,t){return e.length>=t},checkStrengthPass:function(e){return this.REGEXP.strengthPass.test(e)},getElements:function(){var e=this,t=this.$form.querySelectorAll("[data-validate-field]");this.elements=[];for(var r=function(r,i){var n=t[r],o=n.getAttribute("data-validate-field"),s=n.value,a=!1,l=[];if("checkbox"===n.type&&(s=n.checked||"",n.addEventListener("change",(function(t){var r=t.target,i={name:r.getAttribute("data-validate-field"),value:r.checked};delete e.result[i.name],e.validateItem({name:i.name,value:i.value,group:[]}),e.renderErrors()}))),"radio"===n.type){var u=e.elements.filter((function(e){if(e.name===o)return e}))[0];u?(u.group.push(n.checked),a=!0):l.push(n.checked),n.addEventListener("change",(function(t){var r=t.target,i={name:r.getAttribute("data-validate-field"),value:r.checked};delete e.result[i.name],e.validateItem({name:i.name,value:i.value,group:[]}),e.renderErrors()}))}e.setterEventListener(n,"keyup",e.handlerKeyup,"add"),a||e.elements.push({name:o,value:s,group:l})},i=0,n=t.length;i<n;++i)r(i);this.validateElements()},validateRequired:function(e){return!this.isEmpty(e)},validateEmail:function(e){return this.isEmail(e)},validatePhone:function(e){return this.isPhone(e)},validateMinLength:function(e,t){return this.checkLengthMin(e,t)},validateMaxLength:function(e,t){return this.checkLengthMax(e,t)},validateStrengthPass:function(e){return this.checkStrengthPass(e)},validatePassword:function(e){return this.isPassword(e)},validateZip:function(e){return this.isZip(e)},validateRemote:function(e){var t=e.value,r=e.name,i=e.url,n=e.successAnswer,o=e.sendParam,s=e.method;return new Promise((function(e){d({url:i,method:s,data:_defineProperty({},o,t),async:!0,callback:function(t){t.toLowerCase()===n.toLowerCase()&&e("ok"),e({type:"incorrect",name:r})},error:function(){e({type:"error",name:r})}})}))},generateMessage:function(e,t,r){var i=this.messages||this.defaultMessages,n=i[t]&&i[t][e]||this.messages&&"string"==typeof this.messages[t]&&i[t]||this.defaultMessages[e]||this.DEFAULT_REMOTE_ERROR;r&&(n=n.replace(":value",r.toString())),this.result[t]={message:n}},validateElements:function(){var e=this;return this.lockForm(),this.elements.forEach((function(t){e.validateItem({name:t.name,value:t.value,group:t.group})})),this.promisesRemote.length?void Promise.all(this.promisesRemote).then((function(t){t.forEach((function(t){return"ok"===t||("error"===t.type&&alert("Server error occured. Please try later."),e.generateMessage(a,t.name)),void e.renderErrors()}))})):void this.renderErrors()},validateItem:function(e){var c=this,d=e.name,f=e.group,h=e.value,m=e.isKeyupChange,v=this.rules[d]||this.defaultRules[d]||!1;if(v)for(var p in v){var g=v[p];if(p!==t&&p!==u&&""==h)return;switch(p){case u:if("function"!=typeof g)break;if(g(d,h))break;return void this.generateMessage(u,d,g);case t:if(!g)break;if(f.length){var y=!1;if(f.forEach((function(e){c.validateRequired(e)&&(y=!0)})),y)break}else if(this.validateRequired(h))break;return void this.generateMessage(t,d);case r:if(!g)break;if(this.validateEmail(h))break;return void this.generateMessage(r,d);case i:if(!g)break;if(this.validateMinLength(h,g))break;return void this.generateMessage(i,d,g);case n:if(!g)break;if(this.validateMaxLength(h,g))break;return void this.generateMessage(n,d,g);case s:if(!g)break;if(this.validatePhone(h))break;return void this.generateMessage(s,d);case o:if(!g)break;if(this.validatePassword(h))break;return void this.generateMessage(o,d);case l:if(!g||"object"!==(void 0===g?"undefined":_typeof(g)))break;if(g.default&&this.validateStrengthPass(h))break;if(g.custom){var b=void 0;try{b=new RegExp(g.custom)}catch(e){b=this.REGEXP.strengthPass,console.error("Custom regexp for strength rule is not valid. Default regexp was used.")}if(b.test(h))break}return void this.generateMessage(l,d);case"zip":if(!g)break;if(this.validateZip(h))break;return void this.generateMessage("zip",d);case a:if(m)break;if(!g)break;var E=g.url,_=g.successAnswer,w=g.method,k=g.sendParam,S=this.$form.querySelector('input[data-validate-field="'+d+'"]');return this.setterEventListener(S,"keyup",this.handlerKeyup,"remove"),void this.promisesRemote.push(this.validateRemote({name:d,value:h,url:E,method:w,sendParam:k,successAnswer:_}))}}},clearErrors:function(){for(var e=document.querySelectorAll(".js-validate-error-label"),t=0,r=e.length;t<r;++t)e[t].remove();for(var i=0,n=(e=document.querySelectorAll(".js-validate-error-field")).length;i<n;++i)e[i].classList.remove("js-validate-error-field"),e[i].style.border="",e[i].style.color=""},renderErrors:function(){var e=this;if(this.clearErrors(),this.unlockForm(),this.isValidationSuccess=!1,0!==Object.keys(this.result).length){for(var t in this.result){var r=this.result[t].message,i=this.$form.querySelectorAll('[data-validate-field="'+t+'"]'),n=i[i.length-1],o=document.createElement("div");if(o.innerHTML=r,o.className="js-validate-error-label",o.setAttribute("style","color: "+this.colorWrong),n.style.border="1px solid "+this.colorWrong,n.style.color=""+this.colorWrong,n.classList.add("js-validate-error-field"),"checkbox"===n.type||"radio"===n.type){var s=document.querySelector('label[for="'+n.getAttribute("id")+'"]');"label"===n.parentNode.tagName.toLowerCase()?n.parentNode.parentNode.insertBefore(o,null):s?s.parentNode.insertBefore(o,s.nextSibling):n.parentNode.insertBefore(o,n.nextSibling)}else n.parentNode.insertBefore(o,n.nextSibling)}this.tooltipSelectorWrap.length&&(this.state.tooltipsTimer=setTimeout((function(){e.hideTooltips()}),this.tooltipFadeOutTime))}else this.isValidationSuccess=!0},hideTooltips:function(){var e=this;document.querySelectorAll(".js-validate-error-label").forEach((function(t){t.classList.add(e.tooltipFadeOutClass)})),this.state.tooltipsTimer=null},lockForm:function(){for(var e=this.$form.querySelectorAll("input, textarea, button, select"),t=0,r=e.length;t<r;++t)e[t].setAttribute("disabled","disabled"),e[t].style.pointerEvents="none",e[t].style.webitFilter="grayscale(100%)",e[t].style.filter="grayscale(100%)"},unlockForm:function(){for(var e=this.$form.querySelectorAll("input, textarea, button, select"),t=0,r=e.length;t<r;++t)e[t].removeAttribute("disabled"),e[t].style.pointerEvents="",e[t].style.webitFilter="",e[t].style.filter=""}},e.JustValidate=f}(window),window.addEventListener("DOMContentLoaded",(function(){ymaps.ready((function(){var e=new ymaps.Map("map",{center:[55.760769,37.615377],zoom:13}),t=new ymaps.Placemark([55.768942,37.64079],{},{iconLayout:"default#image",iconImageHref:"img/contacts/placemark.png",iconImageSize:[12,12]});e.geoObjects.add(t),e.controls.remove("geolocationControl"),e.controls.remove("zoomControl"),e.controls.remove("searchControl"),e.controls.remove("trafficControl"),e.controls.remove("typeSelector"),e.controls.remove("fullscreenControl"),e.controls.remove("rulerControl")})),new JustValidate(".js-form",{rules:{name:{required:!0,minLength:2,maxLength:12,strength:{custom:"^[А-Яа-яЁёs]+$"}},mail:{required:!0,email:!0},comment:{required:!0}},messages:{name:{required:"Поле обязательное для заполнения",minLength:"Минимум 2 символа",maxLength:"Максимум 12 символов",strength:"Недопустимый формат"},mail:{required:"Поле обязательное для заполнения",email:"Введите корректный email"},comment:{required:"Поле обязательное для заполнения"}}}),new JustValidate(".about__js-form",{rules:{mail:{required:!0,email:!0}},messages:{mail:{required:"Поле обязательное для заполнения",email:"Введите корректный email"}}}),document.querySelector("#call-form-btn").addEventListener("click",(function(){document.querySelector(".search__form").classList.add("is_active_form")})),document.querySelector("#close-form-btn").addEventListener("click",(function(){document.querySelector(".search__form").classList.remove("is_active_form")})),document.querySelector("#burger").addEventListener("click",(function(){document.querySelector(".nav-burger").classList.toggle("is_active_nav")})),document.querySelector("#close-burger").addEventListener("click",(function(){document.querySelector(".nav-burger").classList.remove("is_active_nav")})),document.querySelector("#close-overmap").addEventListener("click",(function(){document.querySelector(".overmap").classList.add("overmap_close")}))}));