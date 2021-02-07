import { useEffect, useRef } from 'react';
import { mouse, perspectiveCamera, scene } from '../container';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
interface Props {
  arToolkitSource: ArToolkitSource;
  arToolkitContext: ArToolkitContext;
  webGLRenderer: THREE.WebGLRenderer | null;
  // intersection: THREE.Intersection[] | null;
  mesh: THREE.TextSprite | null;
}

export const useAnimationFrame = ({ arToolkitSource, arToolkitContext, webGLRenderer, mesh }: Props) => {
  const requestRef = useRef(0);
  const raycaster = new THREE.Raycaster(perspectiveCamera.position);

  useEffect(() => {
    // if (!intersection) return;
    if (!mesh) return;
    const animate = () => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = perspectiveCamera.visible;
      }
      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersection = raycaster.intersectObject(mesh);
      if (intersection.length > 0 && mesh === intersection[0].object) {
        mesh.material.color.setHex(0xff0000);
      } else {
        mesh.material.color.setHex(0xffffff);
      }
      if (!webGLRenderer) return;
      webGLRenderer.render(scene, perspectiveCamera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [webGLRenderer, scene, perspectiveCamera, mouse, mesh]);
};
