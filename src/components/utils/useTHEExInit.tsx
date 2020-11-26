import { useEffect } from 'react';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';
import { perspectiveCamera } from '../camera';

export const ThreexInit = () => {
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
