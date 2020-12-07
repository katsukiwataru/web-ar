import { useEffect } from 'react';
import { Group } from 'three';

export const useTextLoader = (group: Group, pathName: string) => {
  useEffect(() => {
    const loader = new THREE.FontLoader();
    loader.load('../fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeom = new THREE.TextBufferGeometry(`path is ${pathName}`, {
        font: font,
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
