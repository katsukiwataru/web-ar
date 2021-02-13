import { useEffect, useRef, useState } from 'react';

interface Props {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
}

export const useWebGLRenderer = ({ canvas }: Props) => {
  const [webGLRenderer, setWebGLRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    if (!canvas.current) return;
    if (!mounted.current) return;
    const webGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.setClearColor(new THREE.Color(), 0);
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.domElement.style.position = 'fixed';
    webGLRenderer.domElement.style.top = '0px';
    setWebGLRenderer(webGLRenderer);
    mounted.current = false;
  }, [canvas]);

  return webGLRenderer;
};
