import React, { memo, useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

export const scene = new THREE.Scene();
export const group = new THREE.Group();
export const perspectiveCamera = new THREE.PerspectiveCamera();
scene.add(perspectiveCamera);
scene.add(group);

export const CameraContainer = memo(() => {
  const { userContext } = useUserContext();
  const { patternURL } = useMarkerContext();
  const { user, getUser } = userContext;
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);
  const [res, retRes] = useState<TwitterUserFavorite[] | null>(null);

  useEffect(() => {
    getUser(screenName);
    if (!patternURL) return;
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl: patternURL,
      changeMatrixMode: 'modelViewMatrix',
    });
  }, [screenName, patternURL]);

  useEffect(() => {
    if (!user) return;
    const getUserFavorites = async () => {
      const res = await fetchUserFavorites(user.screen_name);
      if (!res) return;
      retRes(res);
    };
    getUserFavorites();
  }, [user]);

  const mesh = useTextLoader(res);

  useEffect(() => {
    if (!mesh) return;
    group.add(mesh);
  }, [mesh]);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer });

  return <WrappedCanvas ref={canvasRef} />;
});
