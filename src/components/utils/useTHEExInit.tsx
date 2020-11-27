import { useEffect } from 'react';
import { PerspectiveCamera } from 'three';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';
// import { perspectiveCamera } from '../Three/RootComponent';
// import { perspectiveCamera } from '../camera';
interface Props {
  perspectiveCamera: PerspectiveCamera;
}

export const useThreexInit = ({ perspectiveCamera }: Props) => {
  useEffect(() => {
    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
      setTimeout(() => {
        onResize();
      }, 1000);
    });
  }, []);
};
