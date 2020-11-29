import { useEffect, useRef } from 'react';
import { Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene, Vector2, WebGLRenderer } from 'three';
import { arToolkitContext, arToolkitSource } from '../THREEx';

interface Props {
  webGLRenderer: WebGLRenderer | null;
  scene: Scene;
  perspectiveCamera: PerspectiveCamera;
  mouse: Vector2;
  markerPlane: Mesh<PlaneBufferGeometry, MeshBasicMaterial>;
}

export const useAnimationFrame = ({ webGLRenderer, scene, perspectiveCamera, mouse, markerPlane }: Props) => {
  const requestRef = useRef(0);

  const raycaster = new THREE.Raycaster();

  useEffect(() => {
    const animate = () => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = perspectiveCamera.visible;
      }
      if (!webGLRenderer) return;
      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersect = raycaster.intersectObject(markerPlane);
      if (intersect.length > 0 && markerPlane === intersect[0].object) {
        markerPlane.material.color.setHex(0xff0000);
      } else {
        markerPlane.material.color.setHex(0xffffff);
      }
      webGLRenderer.render(scene, perspectiveCamera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [webGLRenderer, scene, perspectiveCamera, mouse, markerPlane]);
};
