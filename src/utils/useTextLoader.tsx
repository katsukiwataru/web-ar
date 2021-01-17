import { useMemo } from 'react';

export const useTextLoader = (res: TwitterUserFavorite[] | null) => {
  const favolites = useMemo(() => {
    if (!res) return;
    return res.slice(0, 1).map((r) => {
      const httpsIndex = r.text.indexOf('https');
      const text = r.text.slice(0, httpsIndex);
      const resultText = text.split(/(.{10})/).filter((e) => e);
      return new THREE.TextSprite({
        alignment: 'center',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 1,
        // lineGap: 0.5,
        // padding: 1,
        backgroundColor: '#ffffff',
        fontStyle: 'normal',
        text: resultText.join('\n'),
      });
    });
  }, [res]);
  return favolites;
};
