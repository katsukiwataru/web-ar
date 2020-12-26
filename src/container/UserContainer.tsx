import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

const scene = new THREE.Scene();
const group = new THREE.Group();
const perspectiveCamera = new THREE.PerspectiveCamera();
scene.add(perspectiveCamera);
scene.add(group);

export const CameraContainer = memo(() => {
  const { userContext } = useUserContext();
  const { patternURL } = useMarkerContext();
  const { getUser } = userContext;
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  // const patternURL = useMarkerGenerate();

  useEffect(() => {
    getUser(screenName);
    if (!patternURL) return;
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl: patternURL,
      changeMatrixMode: 'modelViewMatrix',
    });
  }, [patternURL]);

  const textLoader = useMemo(() => {
    const twitterScreenName = ` @${screenName} あああ`;
    // return user ? [twitterScreenName, new Date(user.created_at).toLocaleString('ja-jp')] : [twitterScreenName, ''];
    return [twitterScreenName, ''];
  }, []);

  useTextLoader(group, textLoader);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera });

  return <WrappedCanvas ref={canvasRef} />;
});
