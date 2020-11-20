import { useEffect, useRef } from 'react';
import { WebGLRenderer } from 'three';
import { perspectiveCamera } from '../camera';
import { scene } from '../scene';
import { arToolkitContext, arToolkitSource } from '../THREEx';

export const useAnimationFrame = (webGLRenderer: WebGLRenderer | null) => {
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
