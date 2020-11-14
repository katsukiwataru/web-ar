import { perspectiveCamera } from '../camera';
import { group } from '../group';
import { webGLRenderer } from '../renderer/webGLRenderer';
import { scene } from '../scene';
import { arToolkitContext, arToolkitSource } from '../THREEx';

export function render(el: HTMLElement) {
  el.appendChild(webGLRenderer.domElement);

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
      scene.visible = perspectiveCamera.visible;
    }
    webGLRenderer.render(scene, perspectiveCamera);
  };
  requestAnimationFrame(animate);
}
