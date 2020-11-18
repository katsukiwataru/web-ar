import React, { useEffect, useRef } from 'react';
import { arToolkitContext, arToolkitSource } from '../THREEx';
import { perspectiveCamera } from '../camera';
import { group } from '../group';
import { scene } from '../scene';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { ThreexInit } from '../utils/useTHEExInit';

export const Three = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);

  ThreexInit();

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
    const animate = () => {
      requestAnimationFrame(animate);
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = perspectiveCamera.visible;
      }
      webGLRenderer.render(scene, perspectiveCamera);
    };
    requestAnimationFrame(animate);
  }, [webGLRenderer]);

  return <canvas ref={canvasRef}></canvas>;
};
