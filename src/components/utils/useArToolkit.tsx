import { useEffect, useMemo } from 'react';
import { WebGLRenderer } from 'three';
import { perspectiveCamera } from '../Three/RootComponent';
import { useResize } from './useResize';

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
    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });
  }, []);
  // arToolkitSource.init(() => {
  //   setTimeout(() => {
  //   }, 1000);
  // });

  useResize(arToolkitSource, arToolkitContext, webGLRenderer);

  return { arToolkitContext, arToolkitSource } as const;
};
