import { useEffect, useMemo } from 'react';
import { WebGLRenderer } from 'three';
import { perspectiveCamera } from '../Three/RootComponent';
// import { useResize } from './useResize';

export const useArToolkitInit = (webGLRenderer: WebGLRenderer | null) => {
  const arToolkitSource = useMemo(() => {
    return new THREEx.ArToolkitSource({
      sourceType: 'webcam',
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight,
    });
  }, []);

  const arToolkitContext = useMemo(() => {
    return new THREEx.ArToolkitContext({
      cameraParametersUrl: 'data/camera_para.dat',
      detectionMode: 'mono',
    });
  }, []);

  useEffect(() => {
    console.log('useArToolkitInit');
    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
      setTimeout(() => {
        arToolkitSource.onResizeElement();
        if (!webGLRenderer) return;
        arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
        if (arToolkitContext.arController !== null) {
          console.log(arToolkitContext.arController);
          arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
        }
      }, 1000);
    });
  }, []);


  return { arToolkitContext, arToolkitSource } as const;
};
