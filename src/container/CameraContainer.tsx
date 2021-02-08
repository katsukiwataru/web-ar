import React, { memo, useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

export const sceneLeft = new THREE.Scene();
export const sceneRight = new THREE.Scene();
export const groupLeft = new THREE.Group();
export const groupRight = new THREE.Group();
export const perspectiveCamera = new THREE.PerspectiveCamera();
export const mouse = new THREE.Vector3();

sceneLeft.add(perspectiveCamera);
sceneRight.add(perspectiveCamera);
sceneLeft.add(groupLeft);
sceneRight.add(groupRight);

export const CameraContainer = memo(() => {
  const { userContext } = useUserContext();
  const { patternURL } = useMarkerContext();
  const { user, getUser } = userContext;
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const canvasLeftRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRightRef = useRef<HTMLCanvasElement | null>(null);

  const webGLRendererLeft = useWebGLRenderer({
    canvas: canvasLeftRef,
    width: window.innerWidth / 4,
    stylePosition: 'left',
  });
  const webGLRendererRight = useWebGLRenderer({
    canvas: canvasRightRef,
    width: window.innerWidth / 4,
    stylePosition: 'right',
  });
  const { arToolkitContext: arToolkitContextLeft, arToolkitSource: arToolkitSourceLeft } = useArToolkitInit(
    webGLRendererLeft,
  );
  const { arToolkitContext: arToolkitContextRight, arToolkitSource: arToolkitSourceRight } = useArToolkitInit(
    webGLRendererRight,
  );
  const [res, setRes] = useState<TwitterUserFavorite[] | null>(null);

  console.log(res);

  useEffect(() => {
    getUser(screenName);
    if (!patternURL) return;
    new THREEx.ArMarkerControls(arToolkitContextRight, groupRight, {
      type: 'pattern',
      patternUrl: patternURL,
      changeMatrixMode: 'modelViewMatrix',
    });
    new THREEx.ArMarkerControls(arToolkitContextLeft, groupLeft, {
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
      setRes(res);
    };
    getUserFavorites();
  }, [user]);

  const { textLoader: textLoaderLeft } = useTextLoader({ test: ['<'] });
  const { textLoader: textLoaderRight } = useTextLoader({ test: ['>'] });

  useEffect(() => {
    const handleClick = (event: MouseEvent, string: string) => {
      console.log(string);
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

    if (!webGLRendererLeft) return;
    if (!webGLRendererRight) return;
    webGLRendererLeft.domElement.addEventListener('click', (e) => handleClick(e, 'webGLRendererLeft'));
    webGLRendererRight.domElement.addEventListener('click', (e) => handleClick(e, 'webGLRendererRight'));
    return () => {
      webGLRendererLeft.domElement.removeEventListener('click', (e) => handleClick(e, 'webGLRendererLeft'));
      webGLRendererRight.domElement.removeEventListener('click', (e) => handleClick(e, 'webGLRendererRight'));
    };
  }, [webGLRendererLeft, webGLRendererRight]);

  useEffect(() => {
    groupLeft.add(textLoaderLeft);
    groupRight.add(textLoaderRight);
  }, [textLoaderLeft, textLoaderRight]);

  useAnimationFrame({
    arToolkitContext: [arToolkitContextLeft, arToolkitContextRight],
    arToolkitSource: [arToolkitSourceLeft, arToolkitSourceRight],
    webGLRenderer: [webGLRendererLeft, webGLRendererRight],
  });

  return (
    <div>
      <WrappedCanvas ref={canvasLeftRef} />
      <WrappedCanvas ref={canvasRightRef} />
    </div>
  );
});
