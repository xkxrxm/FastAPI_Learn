(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ad8b5c3"],{"365c":function(e,t,r){"use strict";r.d(t,"c",(function(){return s})),r.d(t,"f",(function(){return u})),r.d(t,"e",(function(){return f})),r.d(t,"d",(function(){return d})),r.d(t,"b",(function(){return p})),r.d(t,"a",(function(){return y}));r("d3b7");var n=r("bc3a"),o=r.n(n),i=o.a.create({baseURL:"",withCredentials:!0,timeout:5e3});i.interceptors.request.use((function(e){var t=window.sessionStorage.getItem("Authorization");return t&&(e.headers["Authorization"]="Bearer "+t),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){var t=e.data,r=e.status;return 200!=r?Promise.reject(new Error(t.msg||t.message||"Error")):t}),(function(e){return console.log("response:",e),Promise.reject(e)}));var a=i,c=r("4328"),l=r.n(c);function s(e){return a({url:"/auth/login",method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:l.a.stringify(e)})}function u(){return a({url:"/auth/userinfo",method:"get"})}function f(e){return a({url:"/person/submit",method:"post",data:e})}function d(e){return a({url:"/person/get",method:"get",params:e})}function p(e){return a({url:"/checkin/submit",method:"post",data:e})}function y(e){return a({url:"/checkin/list",method:"get",params:e})}},4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},a=Date.prototype.toISOString,c={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(e){return a.call(e)},skipNulls:!1,strictNullHandling:!1},l=function e(t,r,o,i,a,l,s,u,f,d,p,y){var b=t;if("function"===typeof s)b=s(r,b);else if(b instanceof Date)b=d(b);else if(null===b){if(i)return l&&!y?l(r,c.encoder):r;b=""}if("string"===typeof b||"number"===typeof b||"boolean"===typeof b||n.isBuffer(b)){if(l){var m=y?r:l(r,c.encoder);return[p(m)+"="+p(l(b,c.encoder))]}return[p(r)+"="+p(String(b))]}var h,g=[];if("undefined"===typeof b)return g;if(Array.isArray(s))h=s;else{var v=Object.keys(b);h=u?v.sort(u):v}for(var w=0;w<h.length;++w){var j=h[w];a&&null===b[j]||(g=Array.isArray(b)?g.concat(e(b[j],o(r,j),o,i,a,l,s,u,f,d,p,y)):g.concat(e(b[j],r+(f?"."+j:"["+j+"]"),o,i,a,l,s,u,f,d,p,y)))}return g};e.exports=function(e,t){var r=e,a=t?n.assign({},t):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!==typeof a.encoder)throw new TypeError("Encoder has to be a function.");var s="undefined"===typeof a.delimiter?c.delimiter:a.delimiter,u="boolean"===typeof a.strictNullHandling?a.strictNullHandling:c.strictNullHandling,f="boolean"===typeof a.skipNulls?a.skipNulls:c.skipNulls,d="boolean"===typeof a.encode?a.encode:c.encode,p="function"===typeof a.encoder?a.encoder:c.encoder,y="function"===typeof a.sort?a.sort:null,b="undefined"!==typeof a.allowDots&&a.allowDots,m="function"===typeof a.serializeDate?a.serializeDate:c.serializeDate,h="boolean"===typeof a.encodeValuesOnly?a.encodeValuesOnly:c.encodeValuesOnly;if("undefined"===typeof a.format)a.format=o["default"];else if(!Object.prototype.hasOwnProperty.call(o.formatters,a.format))throw new TypeError("Unknown format option provided.");var g,v,w=o.formatters[a.format];"function"===typeof a.filter?(v=a.filter,r=v("",r)):Array.isArray(a.filter)&&(v=a.filter,g=v);var j,O=[];if("object"!==typeof r||null===r)return"";j=a.arrayFormat in i?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var A=i[j];g||(g=Object.keys(r)),y&&g.sort(y);for(var x=0;x<g.length;++x){var k=g[x];f&&null===r[k]||(O=O.concat(l(r[k],k,A,u,f,d?p:null,v,y,b,m,w,h)))}var P=O.join(s),C=!0===a.addQueryPrefix?"?":"";return P.length>0?C+P:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(e,t){for(var r={},n=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,c=n.split(t.delimiter,a),l=0;l<c.length;++l){var s,u,f=c[l],d=f.indexOf("]="),p=-1===d?f.indexOf("="):d+1;-1===p?(s=t.decoder(f,i.decoder),u=t.strictNullHandling?null:""):(s=t.decoder(f.slice(0,p),i.decoder),u=t.decoder(f.slice(p+1),i.decoder)),o.call(r,s)?r[s]=[].concat(r[s]).concat(u):r[s]=u}return r},c=function(e,t,r){for(var n=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a)i=[],i=i.concat(n);else{i=r.plainObjects?Object.create(null):{};var c="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,l=parseInt(c,10);!isNaN(l)&&a!==c&&String(l)===c&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(i=[],i[l]=n):i[c]=n}n=i}return n},l=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,l=i.exec(n),s=l?n.slice(0,l.index):n,u=[];if(s){if(!r.plainObjects&&o.call(Object.prototype,s)&&!r.allowPrototypes)return;u.push(s)}var f=0;while(null!==(l=a.exec(n))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,l[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(l[1])}return l&&u.push("["+n.slice(l.index)+"]"),c(u,t,r)}};e.exports=function(e,t){var r=t?n.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!==typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"===typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:i.delimiter,r.depth="number"===typeof r.depth?r.depth:i.depth,r.arrayLimit="number"===typeof r.arrayLimit?r.arrayLimit:i.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"===typeof r.decoder?r.decoder:i.decoder,r.allowDots="boolean"===typeof r.allowDots?r.allowDots:i.allowDots,r.plainObjects="boolean"===typeof r.plainObjects?r.plainObjects:i.plainObjects,r.allowPrototypes="boolean"===typeof r.allowPrototypes?r.allowPrototypes:i.allowPrototypes,r.parameterLimit="number"===typeof r.parameterLimit?r.parameterLimit:i.parameterLimit,r.strictNullHandling="boolean"===typeof r.strictNullHandling?r.strictNullHandling:i.strictNullHandling,""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?a(e,r):e,c=r.plainObjects?Object.create(null):{},s=Object.keys(o),u=0;u<s.length;++u){var f=s[u],d=l(f,o[f],r);c=n.merge(c,d,r)}return n.compact(c)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e){var t;while(e.length){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var n=[],o=0;o<t.length;++o)"undefined"!==typeof t[o]&&n.push(t[o]);r.obj[r.prop]=n}}return t},a=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},c=function e(t,r,o){if(!r)return t;if("object"!==typeof r){if(Array.isArray(t))t.push(r);else{if("object"!==typeof t)return[t,r];(o.plainObjects||o.allowPrototypes||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!==typeof t)return[t].concat(r);var i=t;return Array.isArray(t)&&!Array.isArray(r)&&(i=a(t,o)),Array.isArray(t)&&Array.isArray(r)?(r.forEach((function(r,i){n.call(t,i)?t[i]&&"object"===typeof t[i]?t[i]=e(t[i],r,o):t.push(r):t[i]=r})),t):Object.keys(r).reduce((function(t,i){var a=r[i];return n.call(t,i)?t[i]=e(t[i],a,o):t[i]=a,t}),i)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},s=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},u=function(e){if(0===e.length)return e;for(var t="string"===typeof e?e:String(e),r="",n=0;n<t.length;++n){var i=t.charCodeAt(n);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?r+=t.charAt(n):i<128?r+=o[i]:i<2048?r+=o[192|i>>6]+o[128|63&i]:i<55296||i>=57344?r+=o[224|i>>12]+o[128|i>>6&63]+o[128|63&i]:(n+=1,i=65536+((1023&i)<<10|1023&t.charCodeAt(n)),r+=o[240|i>>18]+o[128|i>>12&63]+o[128|i>>6&63]+o[128|63&i])}return r},f=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],a=o.obj[o.prop],c=Object.keys(a),l=0;l<c.length;++l){var s=c[l],u=a[s];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:s}),r.push(u))}return i(t)},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},p=function(e){return null!==e&&"undefined"!==typeof e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:a,assign:l,compact:f,decode:s,encode:u,isBuffer:p,isRegExp:d,merge:c}},dd7b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("van-nav-bar",{attrs:{title:"登录",fixed:"","safe-area-inset-top":"",placeholder:""}}),r("van-cell-group",{attrs:{title:""}},[r("van-field",{staticClass:"labelCode",attrs:{type:"text",label:"用户名"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),r("van-field",{staticClass:"labelCode",attrs:{type:"password",label:"密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("van-cell-group",{attrs:{border:!1}},[r("div",{staticStyle:{display:"flex","justify-content":"center","padding-top":"2rem"}},[r("van-button",{staticStyle:{width:"30%"},attrs:{round:"",block:"",type:"info"},on:{click:e.doSubmit}},[e._v("登录")])],1)])],1)},o=[],i=r("365c"),a={data:function(){return{loading:!1,username:"",password:""}},methods:{doSubmit:function(){var e=this;this.loading=!0,Object(i["c"])({username:this.username,password:this.password}).then((function(t){window.sessionStorage.setItem("Authorization",t.access_token),Object(i["f"])().then((function(t){window.sessionStorage.setItem("userid",t.id),e.$router.push({path:"/checkin"}),e.loading=!1}))})).catch((function(t){console.log(t),e.loading=!1}))}}},c=a,l=r("2877"),s=Object(l["a"])(c,n,o,!1,null,null,null);t["default"]=s.exports}}]);