import { useEffect } from 'react';
import typeface from '../../fonts/helvetiker_regular.typeface';
// import type { THREE.Group } from 'three';

export const useTextLoader = (group: THREE.Group, pathName: string) => {
  useEffect(() => {
    const loader = new THREE.FontLoader();
    loader.load(typeface, (font) => {
      const textGeom = new THREE.TextBufferGeometry(`${pathName}`, {
        font,
        size: 0.2,
        height: 0.04,
      });
      textGeom.center();
      const text = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      text.position.set(0, 0.75, 0);
      group.add(text);
    });
  }, [group, pathName]);
};
