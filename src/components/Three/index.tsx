import React, { useEffect, useRef } from 'react';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';
import { perspectiveCamera } from '../camera';
import { group } from '../group';
import { height, width } from '../../consts';
import { scene } from '../scene';

export const Three = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  new THREEx.ArMarkerControls(arToolkitContext, group, {
    type: 'pattern',
    patternUrl: 'data/orca.patt',
    changeMatrixMode: 'modelViewMatrix',
  });

  useEffect(() => {
    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
      setTimeout(() => {
        onResize();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const webGLRenderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.setClearColor(new THREE.Color(), 0);
    // webGLRenderer.setSize(640, 480);
    webGLRenderer.setSize(width, height);
    webGLRenderer.domElement.style.position = 'absolute';
    webGLRenderer.domElement.style.top = '0px';
    webGLRenderer.domElement.style.left = '0px';

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
  }, [canvasRef.current]);

  return <canvas ref={canvasRef}></canvas>;
};
