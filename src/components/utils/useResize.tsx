import { useEffect } from 'react';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { ArToolkitContext, ArToolkitSource } from '../../types/THREEx';

export const useResize = (
  arToolkitSource: ArToolkitSource,
  arToolkitContext: ArToolkitContext,
  webGLRenderer: WebGLRenderer | null,
) => {
  useEffect(() => {
    arToolkitSource.onResizeElement();
    if (!webGLRenderer) return;
    arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }, [arToolkitSource, arToolkitContext, webGLRenderer]);
};
