import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';
import { useMarkerGenerate } from '../utils/useMarkerGenerate';

const scene = new THREE.Scene();
const group = new THREE.Group();
const perspectiveCamera = new THREE.PerspectiveCamera();
scene.add(perspectiveCamera);
scene.add(group);

export const UserContainer = memo(() => {
  const { userContext } = useUserContext();
  const { user } = userContext;
  console.log(user);

  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  const patternUrl = useMarkerGenerate();

  useEffect(() => {
    if (!patternUrl) return;
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl,
      changeMatrixMode: 'modelViewMatrix',
    });
  }, [patternUrl]);

  const textLoader = useMemo(() => {
    const twitterScreenName = ` @${screenName} あああ`;
    return user ? [twitterScreenName, new Date(user.created_at).toLocaleString('ja-jp')] : [twitterScreenName, ''];
  }, [user]);

  useTextLoader(group, textLoader);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera });

  return <WrappedCanvas ref={canvasRef} />;
});
