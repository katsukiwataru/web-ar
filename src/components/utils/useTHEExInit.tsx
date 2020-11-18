import { useEffect } from 'react';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';
import { group } from '../group';
import { perspectiveCamera } from '../camera';

export const ThreexInit = () => {
  new THREEx.ArMarkerControls(arToolkitContext, group, {
    type: 'pattern',
    patternUrl: 'data/orca.patt',
    changeMatrixMode: 'modelViewMatrix',
  });

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
