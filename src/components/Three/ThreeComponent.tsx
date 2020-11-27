import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { arToolkitContext } from '../THREEx';
import { useThreexInit } from '../utils/useTHEExInit';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { useAnimationFrame } from '../utils/useAnimation';
// import { perspectiveCamera } from '../camera';
// import { group } from '../group';

export const perspectiveCamera = new THREE.PerspectiveCamera();
export const group = new THREE.Group();
export const scene = new THREE.Scene();

export const ThreeComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const history = useHistory();

  useEffect(() => {
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl: 'data/zoom.patt',
      changeMatrixMode: 'modelViewMatrix',
    });
  }, []);

  useThreexInit({ perspectiveCamera });

  const clickHandle = (event: MouseEvent) => {
    const element = event.target;
    if (!(element instanceof HTMLCanvasElement)) return;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1);
    const markerPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: false,
      }),
    );
    markerPlane.rotation.x = -0.5 * Math.PI;
    group.add(markerPlane);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, perspectiveCamera);
    const intersects = raycaster.intersectObject(markerPlane);
    if (intersects.length !== 0) {
      const intersect = intersects[0];
      const height = 0.1 + Math.random() * 0.4;
      const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.15, height, 0.15), new THREE.MeshNormalMaterial());
      cube.position.copy(group.worldToLocal(intersect.point));
      cube.position.y += 0.5 * height;
      group.add(cube);
    }
    history.push('/');
  };

  useEffect(() => {
    scene.add(perspectiveCamera);
    scene.add(group);
    if (!webGLRenderer) return;
    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeom = new THREE.TextBufferGeometry('path is three', {
        font: font,
        size: 0.2,
        height: 0.04,
      });
      textGeom.center();
      const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      text.position.set(0, 0.75, 0);
      group.add(text);
    });

    webGLRenderer.domElement.addEventListener('click', clickHandle);
    return () => {
      webGLRenderer.domElement.removeEventListener('click', clickHandle);
      <div></div>;
    };
  }, [canvasRef.current, history]);

  useAnimationFrame({ webGLRenderer, scene, perspectiveCamera });

  return <canvas ref={canvasRef}></canvas>;
};
