import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { useAnimationFrame } from '../utils/useAnimation';
import { useArToolkitInit } from '../utils/useArToolkit';
import { useTextLoader } from '../utils/useTextLoader';
import { useLocation } from 'react-router';

export const RootComponent = memo(() => {
  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);
  const group = useMemo(() => {
    return new THREE.Group();
  }, []);
  const perspectiveCamera = useMemo(() => {
    return new THREE.PerspectiveCamera();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const mounted = useRef(true);
  // const history = useHistory();
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  const location = useLocation();

  useEffect(() => {
    if (!mounted.current) return;
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl: 'data/orca.patt',
      changeMatrixMode: 'modelViewMatrix',
    });
    scene.add(perspectiveCamera);
    scene.add(group);
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

  useTextLoader(group, location.pathname);

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
