import React, { useEffect, useRef } from 'react';
import { group } from '../group';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { ThreexInit } from '../utils/useTHEExInit';
import { useAnimationFrame } from '../utils/useAnimation';

export const Three = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);

  ThreexInit();
  useAnimationFrame(webGLRenderer);

  useEffect(() => {
    if (!webGLRenderer) return;
    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeom = new THREE.TextBufferGeometry('Tap Marker!', {
        font: font,
        size: 0.2,
        height: 0.04,
      });
      textGeom.center();
      const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      text.position.set(0, 0.75, 0);
      group.add(text);
    });
  }, [webGLRenderer]);

  return <canvas ref={canvasRef}></canvas>;
};
