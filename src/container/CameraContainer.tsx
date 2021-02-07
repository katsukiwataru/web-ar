import React, { memo, useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

export const scene = new THREE.Scene();
export const group = new THREE.Group();
export const perspectiveCamera = new THREE.PerspectiveCamera();
export const mouse = new THREE.Vector3();

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
    // mesh.map((mesh) => group.add(mesh));
    group.add(mesh);
  }, [mesh]);

  useEffect(() => {
    if (!mesh) return;
    const handleClick = (event: MouseEvent) => {
      const element = event.target;
      if (!(element instanceof HTMLCanvasElement)) return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const mouseX = (x / element.offsetWidth) * 2 - 1;
      const mouseY = -(y / element.offsetHeight) * 2 + 1;

      mouse.unproject(perspectiveCamera);
      mouse.set(mouseX, mouseY, 0);
    };

    if (!webGLRenderer) return;
    webGLRenderer.domElement.addEventListener('click', handleClick);
    return () => {
      webGLRenderer.domElement.removeEventListener('click', handleClick);
    };
  }, [mesh, webGLRenderer]);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, mesh });

  return <WrappedCanvas ref={canvasRef} />;
});
