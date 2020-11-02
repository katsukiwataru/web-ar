import { camera } from '../camera';
import { webGLRenderer } from '../renderer/webGLRenderer';
import { scene } from '../scene';
import { arToolkitContext, arToolkitSource } from '../THREEx';

export function renderSample(el: HTMLElement) {
  el.appendChild(webGLRenderer.domElement);
  // need to declare CubeGeometry type
  // @ts-ignore
  const cube = new THREE.CubeGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(cube, new THREE.MeshNormalMaterial());
  mesh.position.y = 1.0;
  scene.add(mesh);

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    if (arToolkitSource.ready) {
      arToolkitContext.update(arToolkitSource.domElement);
      scene.visible = camera.visible;
    }
    const delta = clock.getDelta();
    mesh.rotation.x += delta * 1.0;
    mesh.rotation.y += delta * 1.5;
    webGLRenderer.render(scene, camera);
  };
  requestAnimationFrame(animate);
}
