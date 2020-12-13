import { useEffect, useRef } from 'react';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

interface Props {
  arToolkitSource: ArToolkitSource;
  arToolkitContext: ArToolkitContext;
  webGLRenderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene;
  perspectiveCamera: THREE.PerspectiveCamera;
}

export const useAnimationFrame = ({
  arToolkitSource,
  arToolkitContext,
  webGLRenderer,
  scene,
  perspectiveCamera,
}: Props) => {
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
  }, [webGLRenderer, scene, perspectiveCamera]);
};
