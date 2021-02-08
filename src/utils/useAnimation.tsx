import { useEffect, useRef } from 'react';
import { mouse, perspectiveCamera, sceneRight, sceneLeft } from '../container';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

interface Props {
  arToolkitSource: ArToolkitSource[];
  arToolkitContext: ArToolkitContext[];
  webGLRenderer: Array<THREE.WebGLRenderer | null>;
}

export const useAnimationFrame = ({ arToolkitSource, arToolkitContext, webGLRenderer }: Props) => {
  const requestRef = useRef(0);
  const raycaster = new THREE.Raycaster(perspectiveCamera.position);

  useEffect(() => {
    const animate = () => {
      if (arToolkitSource[0].ready) {
        arToolkitContext[0].update(arToolkitSource[0].domElement);
        sceneLeft.visible = perspectiveCamera.visible;
      }
      if (arToolkitSource[1].ready) {
        arToolkitContext[1].update(arToolkitSource[1].domElement);
        sceneRight.visible = perspectiveCamera.visible;
      }
      if (!webGLRenderer[0]) return;
      if (!webGLRenderer[1]) return;
      webGLRenderer[0].render(sceneLeft, perspectiveCamera);
      webGLRenderer[1].render(sceneRight, perspectiveCamera);
      requestRef.current = requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, perspectiveCamera);
      // const intersection = raycaster.intersectObject(circle);
      // if (intersection.length > 0) {}
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [webGLRenderer, sceneLeft, sceneRight, perspectiveCamera, mouse]);
};
