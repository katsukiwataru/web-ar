import { useEffect, useRef } from 'react';
import { perspectiveCamera, scene } from '../container';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

interface Props {
  arToolkitSource: ArToolkitSource;
  arToolkitContext: ArToolkitContext;
  webGLRenderer: THREE.WebGLRenderer | null;
}

export const useAnimationFrame = ({ arToolkitSource, arToolkitContext, webGLRenderer }: Props) => {
  const requestRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = perspectiveCamera.visible;
      }
      if (!webGLRenderer) return;
      webGLRenderer.render(scene, perspectiveCamera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [webGLRenderer]);
};
