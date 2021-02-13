import { useMemo } from 'react';
import { REFT, RIGHT } from '../container';

interface Props {
  test: string[];
}

export const useTextLoader = ({ test }: Props) => {
  const textLoader = useMemo(() => {
    const textLoader = new THREE.TextSprite({
      alignment: 'center',
      color: '#000000',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 1,
      backgroundColor: '#ffffff',
      fontStyle: 'normal',
      text: test.join('\n'),
    });
    textLoader.material.opacity = 0.7;
    if (test === REFT) {
      textLoader.position.set(-3, -1, 1);
      return textLoader;
    } else if (test === RIGHT) {
      textLoader.position.set(3, -1, 1);
      return textLoader;
    }
    textLoader.position.set(0, 0, -1);
    return textLoader;
  }, [test]);

  return { textLoader };
};
