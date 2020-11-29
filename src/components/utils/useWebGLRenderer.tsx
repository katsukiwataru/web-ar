import { useEffect, useState } from 'react';
import { WebGLRenderer } from 'three';

export const useWebGLRenderer = (canvas: React.MutableRefObject<HTMLCanvasElement | null>) => {
  const [webGLRenderer, setWebGLRenderer] = useState<WebGLRenderer | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const webGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.setClearColor(new THREE.Color(), 0);
    // webGLRenderer.setSize(640, 480);
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.domElement.style.position = 'absolute';
    webGLRenderer.domElement.style.top = '0px';
    webGLRenderer.domElement.style.left = '0px';
    setWebGLRenderer(webGLRenderer);
  }, [canvas]);

  return webGLRenderer;
};
