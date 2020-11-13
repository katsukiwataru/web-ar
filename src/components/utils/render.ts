import { webGLRenderer } from '../renderer/webGLRenderer';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';

export function render(el: HTMLElement) {
  el.appendChild(webGLRenderer.domElement);

  window.addEventListener('resize', () => {
    onResize();
  });

  arToolkitSource.init(() => {
    setTimeout(() => {
      onResize();
    }, 1000);
  });

  arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  scene.add(camera);

  const group = new THREE.Group();
  scene.add(group);

  new THREEx.ArMarkerControls(arToolkitContext, group, {
    type: 'pattern',
    patternUrl: 'data/orca.patt',
    changeMatrixMode: 'modelViewMatrix',
  });

  const markerPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: false,
    }),
  );
  markerPlane.rotation.x = -0.5 * Math.PI;
  group.add(markerPlane);

  const loader = new THREE.FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeom = new THREE.TextBufferGeometry('Tap Marker!', {
      font: font,
      size: 0.2,
      height: 0.04,
    });
    textGeom.center();
    const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
    text.position.set(0, 0.75, 0);
    group.add(text);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    if (arToolkitSource.ready) {
      arToolkitContext.update(arToolkitSource.domElement);
      scene.visible = camera.visible;
    }
    webGLRenderer.render(scene, camera);
  };
  requestAnimationFrame(animate);
}
