import React, { useEffect, useRef } from 'react';
import { group } from '../group';
import { useWebGLRenderer } from '../utils/useWebGLRenderer';
import { ThreexInit } from '../utils/useTHEExInit';
import { useAnimationFrame } from '../utils/useAnimation';
import { perspectiveCamera } from '../camera';
// import { height, width } from '../../consts';

export const Three = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  // const mouse = new THREE.Vector2();

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
      textGeom.addEventListener('click', (event) => {
        console.log('click', { event });
      });
      const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      text.position.set(0, 0.75, 0);
      group.add(text);
    });

    const raycaster = new THREE.Raycaster();

    webGLRenderer.domElement.addEventListener('click', (event: MouseEvent) => {
      const element = event.target;
      if (!(element instanceof HTMLCanvasElement)) return;
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      console.log(event.target, element.offsetLeft, element.offsetTop, element.offsetWidth, element.offsetHeight);
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

      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersects = raycaster.intersectObject(markerPlane);
      console.log({ intersects });
      if (intersects.length !== 0) {
        const intersect = intersects[0];
        const height = 0.1 + Math.random() * 0.4;
        const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.15, height, 0.15), new THREE.MeshNormalMaterial());
        cube.position.copy(group.worldToLocal(intersect.point));
        cube.position.y += 0.5 * height;
        group.add(cube);
      }
    });
  }, [webGLRenderer]);

  useAnimationFrame(webGLRenderer);

  return <canvas ref={canvasRef}></canvas>;
};
