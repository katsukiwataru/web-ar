import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

export const REFT = ['<'];
export const RIGHT = ['>'];

// export const sceneLeft = new THREE.Scene();
// export const sceneRight = new THREE.Scene();
export const sceneCenter = new THREE.Scene();

// export const groupLeft = new THREE.Group();
// export const groupRight = new THREE.Group();
export const groupCenter = new THREE.Group();

export const perspectiveCamera = new THREE.PerspectiveCamera();
export const mouse = new THREE.Vector3();

// sceneLeft.add(perspectiveCamera);
// sceneRight.add(perspectiveCamera);
sceneCenter.add(perspectiveCamera);

// sceneLeft.add(groupLeft);
// sceneRight.add(groupRight);
sceneCenter.add(groupCenter);
// sceneCenter.add(groupLeft);
// sceneCenter.add(groupRight);

export const CameraContainer = memo(() => {
  const { userContext } = useUserContext();
  const { patternURL } = useMarkerContext();
  const { user, getUser } = userContext;
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  // const canvasLeftRef = useRef<HTMLCanvasElement | null>(null);
  // const canvasRightRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCenterRef = useRef<HTMLCanvasElement | null>(null);

  // const webGLRendererLeft = useWebGLRenderer({
  //   canvas: canvasLeftRef,
  //   width: window.innerWidth / 4,
  //   stylePosition: 'left',
  // });
  // const webGLRendererRight = useWebGLRenderer({
  //   canvas: canvasRightRef,
  //   width: window.innerWidth / 4,
  //   stylePosition: 'right',
  // });
  const webGLRendererCenter = useWebGLRenderer({
    canvas: canvasCenterRef,
    width: window.innerWidth,
    stylePosition: 'left',
  });

  // const { arToolkitContext: arToolkitContextLeft, arToolkitSource: arToolkitSourceLeft } = useArToolkitInit(
  //   webGLRendererLeft,
  // );
  // const { arToolkitContext: arToolkitContextRight, arToolkitSource: arToolkitSourceRight } = useArToolkitInit(
  //   webGLRendererRight,
  // );
  const { arToolkitContext: arToolkitContextCenter, arToolkitSource: arToolkitSourceCenter } = useArToolkitInit(
    webGLRendererCenter,
  );

  const [res, setRes] = useState<TwitterUserFavorite[] | null>(null);

  useEffect(() => {
    getUser(screenName);
    if (!patternURL) return;
    new THREEx.ArMarkerControls(arToolkitContextCenter, groupCenter, {
      type: 'pattern',
      patternUrl: patternURL,
      changeMatrixMode: 'modelViewMatrix',
    });
    // new THREEx.ArMarkerControls(arToolkitContextRight, groupRight, {
    //   type: 'pattern',
    //   patternUrl: patternURL,
    //   changeMatrixMode: 'modelViewMatrix',
    // });
    // new THREEx.ArMarkerControls(arToolkitContextLeft, groupLeft, {
    //   type: 'pattern',
    //   patternUrl: patternURL,
    //   changeMatrixMode: 'modelViewMatrix',
    // });
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

  const contentsText = useMemo(() => {
    if (!res) return [''];
    const httpsIndex = res[0].text.indexOf('https');
    const text = res[0].text.slice(0, httpsIndex);
    const resultText = text.split(/(.{10})/).filter((e) => e);
    return resultText;
  }, [res]);

  const { result: textLoaderCenter } = useTextLoader({ test: contentsText });
  const { result: textLoaderLeft } = useTextLoader({ test: REFT });
  const { result: textLoaderRight } = useTextLoader({ test: RIGHT });

  // console.log(textLoaderLeft);

  // useEffect(() => {
  //   const handleClick = (event: MouseEvent, string: string) => {
  //     console.log(string);
  //     const element = event.target;
  //     if (!(element instanceof HTMLCanvasElement)) return;
  //     const rect = element.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;

  //     const mouseX = (x / element.offsetWidth) * 2 - 1;
  //     const mouseY = -(y / element.offsetHeight) * 2 + 1;

  //     mouse.unproject(perspectiveCamera);
  //     mouse.set(mouseX, mouseY, 0);
  //   };

  //   if (!webGLRendererLeft) return;
  //   if (!webGLRendererRight) return;
  //   webGLRendererLeft.domElement.addEventListener('click', (e) => handleClick(e, 'webGLRendererLeft'));
  //   webGLRendererRight.domElement.addEventListener('click', (e) => handleClick(e, 'webGLRendererRight'));
  //   return () => {
  //     webGLRendererLeft.domElement.removeEventListener('click', (e) => handleClick(e, 'webGLRendererLeft'));
  //     webGLRendererRight.domElement.removeEventListener('click', (e) => handleClick(e, 'webGLRendererRight'));
  //   };
  // }, [webGLRendererLeft, webGLRendererRight]);

  useEffect(() => {
    groupCenter.add(textLoaderRight);
  }, [textLoaderRight]);

  useEffect(() => {
    groupCenter.add(textLoaderLeft);
  }, [textLoaderLeft]);

  useEffect(() => {
    groupCenter.add(textLoaderCenter);
  }, [textLoaderCenter]);

  useAnimationFrame({
    arToolkitContext: [arToolkitContextCenter],
    arToolkitSource: [arToolkitSourceCenter],
    webGLRenderer: [webGLRendererCenter],
  });

  return (
    <div>
      <WrappedCanvas ref={canvasCenterRef} />
      {/* <WrappedCanvas ref={canvasLeftRef} />
      <WrappedCanvas ref={canvasRightRef} /> */}
    </div>
  );
});
