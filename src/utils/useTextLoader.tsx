import { useEffect, useMemo, useState } from 'react';
import jpTypeface from '../../fonts/MotoyaLMaru_W3_mono.typeface';

const fontLoader = new THREE.FontLoader();

export const useTextLoader = (res: TwitterUserFavorite[] | null) => {
  const [mesh, setMesh] = useState<THREE.Mesh<THREE.TextGeometry, THREE.MeshBasicMaterial> | null>(null);

  const favolites = useMemo(() => {
    if (!res) return;
    return res.slice(0, 2).map((r) => {
      return {
        name: r.user.name,
        text: r.text,
        profileImageUrl: r.user.profile_image_url_https,
      };
    });
  }, [res]);

  useEffect(() => {
    if (!favolites) return;
    favolites.map((favolite) => {
      fontLoader.load(jpTypeface, (font) => {
        const nameGeom = new THREE.TextGeometry(`${favolite.name}`, {
          font,
          size: 0.5,
          height: 0,
        });
        nameGeom.center();
        const nameMesh = new THREE.Mesh(nameGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }));
        nameMesh.position.set(0, 0, -3);
        setMesh(nameMesh);
      });
    });
  }, [favolites]);
  return mesh;
};
