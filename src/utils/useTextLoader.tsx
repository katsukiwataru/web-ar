import TextSprite from '@seregpie/three.text-sprite';
import { useMemo } from 'react';

export const useTextLoader = (res: TwitterUserFavorite[] | null) => {
  const favolites = useMemo(() => {
    if (!res) return;
    return res.slice(0, 1).map((r) => {
      const userName = `@${r.user.name}`;
      const httpsIndex = r.text.indexOf('https');
      const text = r.text.slice(0, httpsIndex);
      return new TextSprite({
        alignment: 'left',
        color: '#24ff00',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 0.5,
        fontStyle: 'italic',
        text: [userName, text].join('\n'),
      });
    });
  }, [res]);
  return favolites;
};
