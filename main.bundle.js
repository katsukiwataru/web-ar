/*! For license information please see main.bundle.js.LICENSE.txt */
!function(e){function t(t){for(var r,i,a=t[0],c=t[1],l=t[2],s=0,d=[];s<a.length;s++)i=a[s],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(f&&f(t);d.length;)d.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},u=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/web-ar/";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var f=c;u.push([15,1]),n()}([,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),u=r(n(17)),i=n(21);u.default.render(o.default.createElement(i.App,null),document.getElementById("root"))},,,,,,function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var i=u(n(0)),a=n(22),c=i.lazy((function(){return Promise.resolve().then((function(){return u(n(28))})).then((function(e){return{default:e.TopComponent}}))})),l=i.lazy((function(){return Promise.resolve().then((function(){return u(n(29))})).then((function(e){return{default:e.UserComponent}}))}));t.App=function(){return i.default.createElement(a.HashRouter,null,i.default.createElement(a.Switch,null,i.default.createElement(i.Suspense,{fallback:i.default.createElement("div",null,"loading")},i.default.createElement(a.Route,{exact:!0,path:"/",component:c}),i.default.createElement(a.Route,{exact:!0,path:"/user/:screenName",component:l}))))}},,,,,,,function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.TopComponent=void 0;var i=u(n(0)),a=n(1);t.TopComponent=i.memo((function(){var e=i.useState(""),t=e[0],n=e[1],r=a.useHistory();i.useEffect((function(){var e=document.getElementsByTagName("video");e.length&&e[0].remove()}),[]);return i.default.createElement("div",null,i.default.createElement("p",null,"twitter id"),i.default.createElement("input",{type:"text",value:t,onChange:function(e){n(e.currentTarget.value)},onKeyDown:function(e){"Enter"===e.key&&r.push("/user/"+t)}}))}))},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.UserComponent=void 0;var i=u(n(0)),a=n(1),c=n(30);t.UserComponent=i.memo((function(){var e=a.useRouteMatch().params.screenName,t=i.useMemo((function(){return new THREE.Scene}),[]),n=i.useMemo((function(){return new THREE.Group}),[]),r=i.useMemo((function(){return new THREE.PerspectiveCamera}),[]),o=i.useRef(null),u=c.useWebGLRenderer(o),l=i.useRef(!0),f=c.useArToolkitInit(u,r),s=f.arToolkitContext,d=f.arToolkitSource;i.useEffect((function(){l.current&&(console.log({screenName:e}),t.add(r),t.add(n),l.current=!1)}),[]);var p=i.useMemo((function(){return new THREE.PlaneBufferGeometry(1,1)}),[]),m=i.useMemo((function(){return new THREE.MeshBasicMaterial({color:16711680})}),[]),v=i.useMemo((function(){return new THREE.Mesh(p,m)}),[p,m]);i.useEffect((function(){n.add(v)}),[v]),c.useTextLoader(n,location.pathname);var h=new THREE.Vector2,E=function(e){var t=e.target;if(t instanceof HTMLCanvasElement){var n=e.clientX-t.offsetLeft,r=e.clientY-t.offsetTop,o=t.offsetWidth,u=t.offsetHeight;h.x=n/o*2-1,h.y=-r/u*2+1}};return i.useEffect((function(){if(u)return u.domElement.addEventListener("click",E),function(){u.domElement.removeEventListener("click",E)}}),[u]),c.useAnimationFrame({arToolkitSource:d,arToolkitContext:s,webGLRenderer:u,scene:t,perspectiveCamera:r,mouse:h,markerPlane:v}),i.default.createElement("canvas",{ref:o})}))},function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(31),t),o(n(32),t),o(n(35),t),o(n(36),t),o(n(37),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useAnimationFrame=void 0;var r=n(0);t.useAnimationFrame=function(e){var t=e.arToolkitSource,n=e.arToolkitContext,o=e.webGLRenderer,u=e.scene,i=e.perspectiveCamera,a=e.mouse,c=e.markerPlane,l=r.useRef(0),f=new THREE.Raycaster;r.useEffect((function(){var e=function(){if(t.ready&&(n.update(t.domElement),u.visible=i.visible),o){f.setFromCamera(a,i);var r=f.intersectObject(c);r.length>0&&c===r[0].object?c.material.color.setHex(16711680):c.material.color.setHex(16777215),o.render(u,i),l.current=requestAnimationFrame(e)}};return l.current=requestAnimationFrame(e),function(){return cancelAnimationFrame(l.current)}}),[o,u,i,a,c])}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useArToolkitInit=void 0;var o=r(n(33)),u=n(0);t.useArToolkitInit=function(e,t){var n=u.useMemo((function(){return new THREEx.ArToolkitSource({sourceType:"webcam",displayWidth:window.innerWidth,displayHeight:window.innerHeight})}),[]),r=u.useMemo((function(){return console.log(o.default.resolve("/web-ar/","../data/camera_para.dat")),new THREEx.ArToolkitContext({cameraParametersUrl:"../../data/camera_para.dat",detectionMode:"mono"})}),[]),i=function(){n.onResizeElement(),e&&(n.copyElementSizeTo(e.domElement),null!==r.arController&&n.copyElementSizeTo(r.arController.canvas))};return u.useEffect((function(){return r.init((function(){t.projectionMatrix.copy(r.getProjectionMatrix())})),n.init((function(){i(),setTimeout((function(){i()}),1e3)})),window.addEventListener("resize",(function(){i()})),function(){window.removeEventListener("resize",(function(){i()}))}}),[t]),{arToolkitContext:r,arToolkitSource:n}}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useResize=void 0;var r=n(0);t.useResize=function(e,t,n){r.useEffect((function(){e.onResizeElement(),n&&(e.copyElementSizeTo(n.domElement),null!==t.arController&&e.copyElementSizeTo(t.arController.canvas))}),[e,t,n])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTextLoader=void 0;var r=n(0);t.useTextLoader=function(e,t){r.useEffect((function(){(new THREE.FontLoader).load("../fonts/helvetiker_regular.typeface.json",(function(n){var r=new THREE.TextBufferGeometry("path is "+t,{font:n,size:.2,height:.04});r.center();var o=new THREE.Mesh(r,new THREE.MeshNormalMaterial);o.position.set(0,.75,0),e.add(o)}))}),[e,t])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useWebGLRenderer=void 0;var r=n(0);t.useWebGLRenderer=function(e){var t=r.useState(null),n=t[0],o=t[1],u=r.useRef(!0);return r.useEffect((function(){if(e.current&&u.current){var t=new THREE.WebGLRenderer({canvas:e.current,antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setClearColor(new THREE.Color,0),t.setSize(window.innerWidth,window.innerHeight),t.domElement.style.position="absolute",t.domElement.style.top="0px",t.domElement.style.left="0px",o(t),u.current=!1}}),[e]),n}}]);