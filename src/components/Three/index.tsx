import React, { useEffect, useRef } from 'react';
import { render } from '../utils/render';
import { arToolkitContext, arToolkitSource, onResize } from '../THREEx';
import { perspectiveCamera } from '../camera';
import { group } from '../group';

export const Three = () => {
  const ref = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!ref.current) return;
    render(ref.current);
  }, [ref.current]);

  return <div ref={ref}></div>;
};
