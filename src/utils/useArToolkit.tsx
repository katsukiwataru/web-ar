import { useEffect, useMemo } from 'react';
import { PerspectiveCamera, WebGLRenderer } from 'three';

export const useArToolkitInit = (webGLRenderer: WebGLRenderer | null, perspectiveCamera: PerspectiveCamera) => {
  const arToolkitSource = useMemo(() => {
    return new THREEx.ArToolkitSource({
      sourceType: 'webcam',
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight,
    });
  }, []);

  const arToolkitContext = useMemo(() => {
    return new THREEx.ArToolkitContext({
      cameraParametersUrl: `${process.env.PUBLIC_PATH}data/camera_para.dat`,
      detectionMode: 'mono',
    });
  }, []);

  useEffect(() => {
    const onResize = () => {
      arToolkitSource.onResizeElement();
      if (!webGLRenderer) return;
      arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      }
    };

    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
      onResize();
      setTimeout(() => {
        onResize();
      }, 1000);
    });

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [perspectiveCamera]);

  return { arToolkitContext, arToolkitSource } as const;
};
