import { useMemo } from 'react';

interface Props {
  test: string[];
}
// export const useTextLoader = (res: TwitterUserFavorite[] | null) => {
export const useTextLoader = ({ test }: Props) => {
  const textLoader = useMemo(() => {
    // if (!res) return null;
    // return res.slice(0, 1).map((r) => {
    // const httpsIndex = res[0].text.indexOf('https');
    // const text = res[0].text.slice(0, httpsIndex);
    // const resultText = text.split(/(.{10})/).filter((e) => e);
    return new THREE.TextSprite({
      alignment: 'center',
      color: '#000000',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 1,
      // lineGap: 0.5,
      // padding: 1,
      backgroundColor: '#ffffff',
      fontStyle: 'normal',
      text: test.join('\n'),
      // text: resultText.join('\n'),
    });
    // });
  }, []);

  return { textLoader };
};
