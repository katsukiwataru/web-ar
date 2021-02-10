import { useEffect, useRef } from 'react';
import { mouse, perspectiveCamera, sceneCenter } from '../container';
import { ArToolkitContext, ArToolkitSource } from '../types/THREEx';

interface Props {
  arToolkitSource: ArToolkitSource[];
  arToolkitContext: ArToolkitContext[];
  webGLRenderer: Array<THREE.WebGLRenderer | null>;
  textLoader: THREE.TextSprite[];
  setNext: React.Dispatch<React.SetStateAction<number>>;
}

export const useAnimationFrame = ({ arToolkitSource, arToolkitContext, webGLRenderer, textLoader, setNext }: Props) => {
  const requestAnimationRef = useRef(0);
  const requestFetchRef = useRef(true);

  const raycaster = new THREE.Raycaster(perspectiveCamera.position);

  useEffect(() => {
    const animate = () => {
      if (arToolkitSource[0].ready) {
        arToolkitContext[0].update(arToolkitSource[0].domElement);
        sceneCenter.visible = perspectiveCamera.visible;
      }
      if (!webGLRenderer[0]) return;
      webGLRenderer[0].render(sceneCenter, perspectiveCamera);
      requestAnimationRef.current = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, perspectiveCamera);
      const intersectionRight = raycaster.intersectObject(textLoader[1]);
      if (intersectionRight.length > 0 && requestFetchRef.current) {
        console.log('right click');
        setNext(1);
        // requestFetchRef.current = false;
      }
      const intersectionLeft = raycaster.intersectObject(textLoader[0]);
      if (intersectionLeft.length > 0 && requestFetchRef.current) {
        console.log('left click');
        setNext(0);
        // requestFetchRef.current = false;
      }
    };
    requestAnimationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, [requestFetchRef.current, webGLRenderer, sceneCenter, perspectiveCamera, mouse, textLoader]);
};
