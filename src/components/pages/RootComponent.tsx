import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { useAnimationFrame } from '../utils/useAnimation';
import { useArToolkitInit } from '../utils/useArToolkit';

// export const perspectiveCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
export const perspectiveCamera = new THREE.PerspectiveCamera();
export const group = new THREE.Group();
export const scene = new THREE.Scene();

export const RootComponent = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const mounted = useRef(true);
  // const history = useHistory();
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer);

  useEffect(() => {
    if (!mounted.current) return;
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl: 'data/orca.patt',
      changeMatrixMode: 'modelViewMatrix',
    });
    mounted.current = false;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.PlaneBufferGeometry(1, 1);
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // colorWrite: false,
      // depthWrite: false,
    });
  }, []);

  const markerPlane = useMemo(() => {
    return new THREE.Mesh(geometry, material);
  }, [geometry, material]);

  useEffect(() => {
    group.add(markerPlane);
  }, [markerPlane]);

  const mouse = new THREE.Vector2();

  const handleClick = (event: MouseEvent) => {
    const element = event.target;
    if (!(element instanceof HTMLCanvasElement)) return;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
    // const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1);
  };

  const textLoader = () => {
    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeom = new THREE.TextBufferGeometry('path is root', {
        font: font,
        size: 0.2,
        height: 0.04,
      });
      textGeom.center();
      const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      text.position.set(0, 0.75, 0);
      group.add(text);
    });
  };

  useEffect(() => {
    scene.add(perspectiveCamera);
    scene.add(group);
    textLoader();
  }, []);

  useEffect(() => {
    if (!webGLRenderer) return;
    webGLRenderer.domElement.addEventListener('click', handleClick);
    return () => {
      webGLRenderer.domElement.removeEventListener('click', handleClick);
      <canvas></canvas>;
    };
  }, [webGLRenderer]);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera, mouse, markerPlane });

  return <canvas ref={canvasRef}></canvas>;
});
