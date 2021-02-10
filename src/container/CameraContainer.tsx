import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

export const REFT = ['<'];
export const RIGHT = ['>'];

export const sceneCenter = new THREE.Scene();

export const groupCenter = new THREE.Group();

export const perspectiveCamera = new THREE.PerspectiveCamera();
export const mouse = new THREE.Vector3();

sceneCenter.add(perspectiveCamera);

sceneCenter.add(groupCenter);

export const CameraContainer = memo(() => {
  const { userContext } = useUserContext();
  const { patternURL } = useMarkerContext();
  const { user, getUser } = userContext;
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const canvasCenterRef = useRef<HTMLCanvasElement | null>(null);

  const webGLRendererCenter = useWebGLRenderer({
    canvas: canvasCenterRef,
    width: window.innerWidth,
    stylePosition: 'left',
  });

  const { arToolkitContext: arToolkitContextCenter, arToolkitSource: arToolkitSourceCenter } = useArToolkitInit(
    webGLRendererCenter,
  );

  const [res, setRes] = useState<TwitterUserFavorite[] | null>(null);
  const [next, setNext] = useState(0);

  useEffect(() => {
    getUser(screenName);
    if (!patternURL) return;
    new THREEx.ArMarkerControls(arToolkitContextCenter, groupCenter, {
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

  const contentsText = useMemo(() => {
    if (!res) return [''];
    const httpsIndex = res[next].text.indexOf('https');
    const text = res[next].text.slice(0, httpsIndex);
    const resultText = text.split(/(.{10})/).filter((e) => e);
    console.log(resultText);
    return resultText;
  }, [res, next]);

  const { result: textLoaderCenter } = useTextLoader({ test: contentsText });
  const { result: textLoaderLeft } = useTextLoader({ test: REFT });
  const { result: textLoaderRight } = useTextLoader({ test: RIGHT });

  const handleEventClick = useCallback((param: 'left' | 'right') => {
    if (param === 'right') {
      setNext(1);
    } else {
      setNext(0);
    }
  }, []);

  useEffect(() => {
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

      const raycaster = new THREE.Raycaster(perspectiveCamera.position);

      raycaster.setFromCamera(mouse, perspectiveCamera);

      const intersectionLeft = raycaster.intersectObject(textLoaderLeft);
      if (intersectionLeft.length > 0) {
        handleEventClick('left');
      }

      const intersectionRight = raycaster.intersectObject(textLoaderRight);
      if (intersectionRight.length > 0) {
        handleEventClick('right');
      }
    };

    if (!webGLRendererCenter) return;
    webGLRendererCenter.domElement.addEventListener('click', handleClick);
    return () => {
      webGLRendererCenter.domElement.removeEventListener('click', handleClick);
    };
  }, [mouse, webGLRendererCenter]);

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
    </div>
  );
});
