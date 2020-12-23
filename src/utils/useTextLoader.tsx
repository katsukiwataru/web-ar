import { useEffect } from 'react';
// import jpTypeface from '/static/MotoyaLMaru_W3_mono.typeface';

export const useTextLoader = (group: THREE.Group, texts: string[]) => {
  useEffect(() => {
    const loader = new THREE.FontLoader();
    texts.map((text, index) => {
      loader.load('/MotoyaLMaru_W3_mono.typeface', (font) => {
        const textGeom = new THREE.TextBufferGeometry(`${text}`, {
          font,
          size: 0.5,
          height: 0.04,
        });
        textGeom.center();
        const textMesh = new THREE.Mesh(textGeom, new THREE.MeshNormalMaterial());
        textMesh.position.set(-index, -index, -3);
        group.add(textMesh);
      });
    });
  }, [group, texts]);
};
