import { useEffect } from 'react';
import typeface from '../../fonts/helvetiker_regular.typeface';

export const useTextLoader = (group: THREE.Group, text: string, y: number) => {
  useEffect(() => {
    const loader = new THREE.FontLoader();
    loader.load(typeface, (font) => {
      const textGeom = new THREE.TextBufferGeometry(`${text}`, {
        font,
        size: 0.2,
        height: 0.04,
      });
      textGeom.center();
      const textMesh = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
      textMesh.position.set(0, y, 0);
      group.add(textMesh);
    });
  }, [group, text, y]);
};
