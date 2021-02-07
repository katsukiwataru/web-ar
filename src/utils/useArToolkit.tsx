import { useEffect, useMemo } from 'react';
import dat from '../../data/camera_para.dat';
import { perspectiveCamera } from '../container';

export const useArToolkitInit = (webGLRenderer: THREE.WebGLRenderer | null) => {
  const arToolkitSource = useMemo(() => {
    return new THREEx.ArToolkitSource({
      sourceType: 'webcam',
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight,
    });
  }, []);

  const arToolkitContext = useMemo(() => {
    return new THREEx.ArToolkitContext({
      cameraParametersUrl: dat,
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
      // サイズを取得
      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーのサイズを調整する
      webGLRenderer.setPixelRatio(window.devicePixelRatio);
      webGLRenderer.setSize(width, height);

      // カメラのアスペクト比を正す
      perspectiveCamera.aspect = width / height;
      perspectiveCamera.updateProjectionMatrix();
    };

    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
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
