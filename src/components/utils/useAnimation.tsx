import { useEffect, useRef } from 'react';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { arToolkitContext, arToolkitSource } from '../THREEx';
// import { perspectiveCamera, scene } from '../Three/RootComponent';
// import { perspectiveCamera } from '../camera';
// import { scene } from '../scene';
interface Props {
  webGLRenderer: WebGLRenderer | null;
  scene: Scene;
  perspectiveCamera: PerspectiveCamera;
}

export const useAnimationFrame = ({ webGLRenderer, scene, perspectiveCamera }: Props) => {
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
