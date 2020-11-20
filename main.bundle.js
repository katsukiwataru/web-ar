/*! For license information please see main.bundle.js.LICENSE.txt */
!function(e){function t(t){for(var n,a,u=t[0],l=t[1],c=t[2],d=0,f=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(s&&s(t);f.length;)f.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,u=1;u<r.length;u++){var l=r[u];0!==o[l]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={0:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window.webpackJsonp=window.webpackJsonp||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var s=l;i.push([6,1]),r()}([,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.perspectiveCamera=void 0,t.perspectiveCamera=new THREE.PerspectiveCamera},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.group=void 0,t.group=new THREE.Group},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.height=t.width=void 0,t.width=window.innerWidth,t.height=window.innerHeight},,function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.onResize=t.arToolkitContext=t.arToolkitSource=void 0;var o,i,a=r(3),u=r(16);t.arToolkitSource=(o=new THREEx.ArToolkitSource({sourceType:"webcam",displayWidth:a.width,displayHeight:a.height}),i=new THREEx.ArToolkitContext({cameraParametersUrl:"data/camera_para.dat",detectionMode:"mono"}),(n={arToolkitSource:o,arToolkitContext:i,onResize:function(){o.onResizeElement(),o.copyElementSizeTo(u.webGLRenderer.domElement),null!==i.arController&&o.copyElementSizeTo(i.arController.canvas)}}).arToolkitSource),t.arToolkitContext=n.arToolkitContext,t.onResize=n.onResize},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(0)),i=n(r(8)),a=r(12);i.default.render(o.default.createElement(a.App,null),document.getElementById("root"))},,,,,,function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var o=n(r(0)),i=r(13);t.App=function(){return o.default.createElement(i.Three,null)}},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Three=void 0;var a=i(r(0)),u=r(2),l=r(14),c=r(15),s=r(17),d=r(1);t.Three=function(){var e=a.useRef(null),t=l.useWebGLRenderer(e);return c.ThreexInit(),a.useEffect((function(){if(t){(new THREE.FontLoader).load("fonts/helvetiker_regular.typeface.json",(function(e){var t=new THREE.TextBufferGeometry("Tap Marker!",{font:e,size:.2,height:.04});t.center(),t.addEventListener("click",(function(e){}));var r=new THREE.Mesh(t,new THREE.MeshNormalMaterial);r.position.set(0,.75,0),u.group.add(r)}));var e=new THREE.Raycaster;t.domElement.addEventListener("click",(function(t){var r=t.target;if(r instanceof HTMLCanvasElement){var n=t.clientX-r.offsetLeft,o=t.clientY-r.offsetTop,i=r.offsetWidth,a=r.offsetHeight,l=new THREE.Vector2(n/i*2-1,-o/a*2+1),c=new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1),new THREE.MeshBasicMaterial({colorWrite:!1,depthWrite:!1}));c.rotation.x=-.5*Math.PI,u.group.add(c),e.setFromCamera(l,d.perspectiveCamera);var s=e.intersectObject(c);if(0!==s.length){var f=s[0],p=.1+.4*Math.random(),v=new THREE.Mesh(new THREE.BoxBufferGeometry(.15,p,.15),new THREE.MeshNormalMaterial);v.position.copy(u.group.worldToLocal(f.point)),v.position.y+=.5*p,u.group.add(v)}}}))}}),[t]),s.useAnimationFrame(t),a.default.createElement("canvas",{ref:e})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useWebGLRenderer=void 0;var n=r(0),o=r(3);t.useWebGLRenderer=function(e){var t=n.useState(null),r=t[0],i=t[1];return n.useEffect((function(){if(e.current){var t=new THREE.WebGLRenderer({canvas:e.current,antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setClearColor(new THREE.Color,0),t.setSize(o.width,o.height),t.domElement.style.position="absolute",t.domElement.style.top="0px",t.domElement.style.left="0px",i(t)}}),[e]),r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ThreexInit=void 0;var n=r(0),o=r(5),i=r(2),a=r(1);t.ThreexInit=function(){new THREEx.ArMarkerControls(o.arToolkitContext,i.group,{type:"pattern",patternUrl:"data/orca.patt",changeMatrixMode:"modelViewMatrix"}),n.useEffect((function(){o.arToolkitContext.init((function(){a.perspectiveCamera.projectionMatrix.copy(o.arToolkitContext.getProjectionMatrix())})),o.arToolkitSource.init((function(){setTimeout((function(){o.onResize()}),1e3)}))}),[])}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.webGLRenderer=void 0;var n,o=r(3);t.webGLRenderer=(n=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),n.setPixelRatio(window.devicePixelRatio),n.setClearColor(new THREE.Color,0),n.setSize(o.width,o.height),n.domElement.style.position="absolute",n.domElement.style.top="0px",n.domElement.style.left="0px",{webGLRenderer:n}).webGLRenderer},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useAnimationFrame=void 0;var n=r(0),o=r(1),i=r(18),a=r(5);t.useAnimationFrame=function(e){var t=n.useRef(0);n.useEffect((function(){var r=function(){a.arToolkitSource.ready&&(a.arToolkitContext.update(a.arToolkitSource.domElement),i.scene.visible=o.perspectiveCamera.visible),e&&(e.render(i.scene,o.perspectiveCamera),t.current=requestAnimationFrame(r))};return t.current=requestAnimationFrame(r),function(){return cancelAnimationFrame(t.current)}}),[e])}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scene=void 0;var n=r(1),o=r(2),i=new THREE.Scene;t.scene=i,i.add(n.perspectiveCamera),i.add(o.group)}]);