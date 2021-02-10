import { useEffect, useRef, useState } from 'react';

type stylePosition = 'left' | 'right';

interface Props {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  width: number;
  stylePosition: stylePosition;
}

export const useWebGLRenderer = ({ canvas, width, stylePosition }: Props) => {
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
    webGLRenderer.setSize(width, window.innerHeight);
    webGLRenderer.domElement.style.position = 'fixed';
    webGLRenderer.domElement.style.top = '0px';
    if (stylePosition === 'left') {
      webGLRenderer.domElement.style.left = '0px';
    } else {
      webGLRenderer.domElement.style.right = '0px';
    }
    setWebGLRenderer(webGLRenderer);
    mounted.current = false;
  }, [canvas]);

  return webGLRenderer;
};
