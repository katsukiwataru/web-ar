import { useMemo } from 'react';
import { REFT, RIGHT } from '../container';

interface Props {
  test: string[];
}

export const useTextLoader = ({ test }: Props) => {
  const textLoader = useMemo(() => {
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
  }, [test]);

  // console.log(textLoader, textLoader.position.set(10, 10, 10));

  const result = useMemo(() => {
    if (test === REFT) {
      textLoader.position.set(-3, 1, 1);
      return textLoader;
    } else if (test === RIGHT) {
      textLoader.position.set(3, 1, 1);
      return textLoader;
    }
    return textLoader;
  }, [textLoader]);

  return { result };
};
