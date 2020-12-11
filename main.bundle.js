/*! For license information please see main.bundle.js.LICENSE.txt */
!function(e){function t(t){for(var r,a,u=t[0],c=t[1],l=t[2],f=0,d=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);d.length;)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={0:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/web-ar/";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=c;i.push([15,1]),n()}([,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),i=r(n(17)),a=n(21);i.default.render(o.default.createElement(a.App,null),document.getElementById("root"))},,,,,,function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var a=i(n(0)),u=n(22),c=a.lazy((function(){return Promise.resolve().then((function(){return i(n(28))})).then((function(e){return{default:e.TopComponent}}))})),l=a.lazy((function(){return Promise.resolve().then((function(){return i(n(29))})).then((function(e){return{default:e.UserComponent}}))}));t.App=function(){return a.default.createElement(u.HashRouter,{basename:"/web-ar/"},a.default.createElement(u.Switch,null,a.default.createElement(a.Suspense,{fallback:a.default.createElement("div",null,"loading")},a.default.createElement(u.Route,{exact:!0,path:"/",component:c}),a.default.createElement(u.Route,{exact:!0,path:"/user/:screenName",component:l}))))}},,,,,,,function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.TopComponent=void 0;var a=i(n(0)),u=n(1);t.TopComponent=a.memo((function(){var e=a.useState(""),t=e[0],n=e[1],r=u.useHistory();a.useEffect((function(){var e=document.getElementsByTagName("video");e.length&&e[0].remove()}),[]);return a.default.createElement("div",null,a.default.createElement("p",null,"twitter id"),a.default.createElement("input",{type:"text",value:t,onChange:function(e){n(e.currentTarget.value)},onKeyDown:function(e){"Enter"===e.key&&r.push("/user/"+t)}}))}))},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},u=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.UserComponent=void 0;var c=i(n(0)),l=n(1),s=n(30),f=n(33);t.UserComponent=c.memo((function(){var e=l.useRouteMatch().params.screenName,t=c.useMemo((function(){return new THREE.Scene}),[]),n=c.useMemo((function(){return new THREE.Group}),[]),r=c.useMemo((function(){return new THREE.PerspectiveCamera}),[]),o=c.useRef(null),i=f.useWebGLRenderer(o),d=c.useRef(!0),p=c.useState(null),v=p[0],h=p[1],m=f.useArToolkitInit(i,r),b=m.arToolkitContext,y=m.arToolkitSource;c.useEffect((function(){d.current&&(v?(new THREEx.ArMarkerControls(b,n,{type:"pattern",patternUrl:v,changeMatrixMode:"modelViewMatrix"}),t.add(r),t.add(n),d.current=!1):a(void 0,void 0,void 0,(function(){var t,n,r;return u(this,(function(o){switch(o.label){case 0:return[4,s.getUser(e)];case 1:return t=o.sent(),[4,fetch(t.profile_image_url_https.replace("_normal",""))];case 2:return[4,o.sent().blob()];case 3:return n=o.sent(),r=URL.createObjectURL(n),[4,new Promise((function(t){THREEx.ArPatternFile.buildFullMarker(r,.5,512,"black",(function(n){var r=window.document.createElement("a");r.href=n,r.download="pattern-"+(e||"marker")+".png",document.body.appendChild(r),r.click(),document.body.removeChild(r),t(n)}))}))];case 4:return o.sent(),THREEx.ArPatternFile.encodeImageURL(r,(function(e){var t=new Blob([e],{type:"text/plain"});h(URL.createObjectURL(t))})),[2]}}))})))}),[v]);var w=c.useMemo((function(){return new THREE.PlaneBufferGeometry(1,1)}),[]),_=c.useMemo((function(){return new THREE.MeshBasicMaterial({color:16711680})}),[]),E=c.useMemo((function(){return new THREE.Mesh(w,_)}),[w,_]);c.useEffect((function(){n.add(E)}),[E]),f.useTextLoader(n,location.pathname);var g=new THREE.Vector2,T=function(e){var t=e.target;if(t instanceof HTMLCanvasElement){var n=e.clientX-t.offsetLeft,r=e.clientY-t.offsetTop,o=t.offsetWidth,i=t.offsetHeight;g.x=n/o*2-1,g.y=-r/i*2+1}};return c.useEffect((function(){if(i)return i.domElement.addEventListener("click",T),function(){i.domElement.removeEventListener("click",T)}}),[i]),f.useAnimationFrame({arToolkitSource:y,arToolkitContext:b,webGLRenderer:i,scene:t,perspectiveCamera:r,mouse:g,markerPlane:E}),c.default.createElement("canvas",{ref:o})}))},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(31),t)},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getUserFavorites=t.getUser=void 0;var i=n(32);t.getUser=function(e){return r(void 0,void 0,void 0,(function(){var t;return o(this,(function(n){switch(n.label){case 0:return(t=new URL("users",i.apiURL.href)).searchParams.append("screenName",e),[4,i.apiBase(t)];case 1:return[2,n.sent()]}}))}))},t.getUserFavorites=function(e){return r(void 0,void 0,void 0,(function(){var t;return o(this,(function(n){switch(n.label){case 0:return(t=new URL("favorites",i.apiURL.href)).searchParams.append("screenName",e),[4,i.apiBase(t)];case 1:return[2,n.sent()]}}))}))}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.apiBase=t.apiURL=void 0,t.apiURL=new URL("http://localhost:3000/api/v1/"),t.apiBase=function(e){return r(void 0,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,fetch(e.href)];case 1:return[4,t.sent().json()];case 2:return[2,t.sent()]}}))}))}},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(34),t),o(n(35),t),o(n(38),t),o(n(39),t),o(n(40),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useAnimationFrame=void 0;var r=n(0);t.useAnimationFrame=function(e){var t=e.arToolkitSource,n=e.arToolkitContext,o=e.webGLRenderer,i=e.scene,a=e.perspectiveCamera,u=e.mouse,c=e.markerPlane,l=r.useRef(0),s=new THREE.Raycaster;r.useEffect((function(){var e=function(){if(t.ready&&(n.update(t.domElement),i.visible=a.visible),o){s.setFromCamera(u,a);var r=s.intersectObject(c);r.length>0&&c===r[0].object?c.material.color.setHex(16711680):c.material.color.setHex(16777215),o.render(i,a),l.current=requestAnimationFrame(e)}};return l.current=requestAnimationFrame(e),function(){return cancelAnimationFrame(l.current)}}),[o,i,a,u,c])}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useArToolkitInit=void 0;var o=r(n(36)),i=n(0);t.useArToolkitInit=function(e,t){var n=i.useMemo((function(){return new THREEx.ArToolkitSource({sourceType:"webcam",displayWidth:window.innerWidth,displayHeight:window.innerHeight})}),[]),r=i.useMemo((function(){return new THREEx.ArToolkitContext({cameraParametersUrl:o.default.resolve("/web-ar/","/data/camera_para.dat"),detectionMode:"mono"})}),[]),a=function(){n.onResizeElement(),e&&(n.copyElementSizeTo(e.domElement),null!==r.arController&&n.copyElementSizeTo(r.arController.canvas))};return i.useEffect((function(){return r.init((function(){t.projectionMatrix.copy(r.getProjectionMatrix())})),n.init((function(){a(),setTimeout((function(){a()}),1e3)})),window.addEventListener("resize",(function(){a()})),function(){window.removeEventListener("resize",(function(){a()}))}}),[t]),{arToolkitContext:r,arToolkitSource:n}}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useResize=void 0;var r=n(0);t.useResize=function(e,t,n){r.useEffect((function(){e.onResizeElement(),n&&(e.copyElementSizeTo(n.domElement),null!==t.arController&&e.copyElementSizeTo(t.arController.canvas))}),[e,t,n])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTextLoader=void 0;var r=n(0);t.useTextLoader=function(e,t){r.useEffect((function(){(new THREE.FontLoader).load("../fonts/helvetiker_regular.typeface.json",(function(n){var r=new THREE.TextBufferGeometry("path is "+t,{font:n,size:.2,height:.04});r.center();var o=new THREE.Mesh(r,new THREE.MeshNormalMaterial);o.position.set(0,.75,0),e.add(o)}))}),[e,t])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useWebGLRenderer=void 0;var r=n(0);t.useWebGLRenderer=function(e){var t=r.useState(null),n=t[0],o=t[1],i=r.useRef(!0);return r.useEffect((function(){if(e.current&&i.current){var t=new THREE.WebGLRenderer({canvas:e.current,antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setClearColor(new THREE.Color,0),t.setSize(window.innerWidth,window.innerHeight),t.domElement.style.position="absolute",t.domElement.style.top="0px",t.domElement.style.left="0px",o(t),i.current=!1}}),[e]),n}}]);