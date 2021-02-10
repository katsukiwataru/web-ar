import { useEffect, useRef } from 'react';
import { mouse, perspectiveCamera, sceneCenter } from '../container';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

interface Props {
  arToolkitSource: ArToolkitSource[];
  arToolkitContext: ArToolkitContext[];
  webGLRenderer: Array<THREE.WebGLRenderer | null>;
}

export const useAnimationFrame = ({ arToolkitSource, arToolkitContext, webGLRenderer }: Props) => {
  const requestAnimationRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      if (arToolkitSource[0].ready) {
        arToolkitContext[0].update(arToolkitSource[0].domElement);
        sceneCenter.visible = perspectiveCamera.visible;
      }
      if (!webGLRenderer[0]) return;
      webGLRenderer[0].render(sceneCenter, perspectiveCamera);
      requestAnimationRef.current = requestAnimationFrame(animate);
    };
    requestAnimationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, [webGLRenderer, sceneCenter, perspectiveCamera, mouse]);
};
