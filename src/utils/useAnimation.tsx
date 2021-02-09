import { useEffect, useRef } from 'react';
import { mouse, perspectiveCamera, sceneCenter } from '../container';
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
        sceneCenter.visible = perspectiveCamera.visible;
      }
      // if (arToolkitSource[1].ready) {
      //   arToolkitContext[1].update(arToolkitSource[1].domElement);
      //   sceneRight.visible = perspectiveCamera.visible;
      // }
      // if (arToolkitSource[2].ready) {
      //   arToolkitContext[2].update(arToolkitSource[1].domElement);
      //   sceneCenter.visible = perspectiveCamera.visible;
      // }
      if (!webGLRenderer[0]) return;
      // if (!webGLRenderer[1]) return;
      // if (!webGLRenderer[2]) return;
      webGLRenderer[0].render(sceneCenter, perspectiveCamera);
      // webGLRenderer[1].render(sceneRight, perspectiveCamera);
      // webGLRenderer[2].render(sceneCenter, perspectiveCamera);
      requestRef.current = requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, perspectiveCamera);
      // const intersection = raycaster.intersectObject(circle);
      // if (intersection.length > 0) {}
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [webGLRenderer, sceneCenter, perspectiveCamera, mouse]);
};
