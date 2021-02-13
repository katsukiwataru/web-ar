import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { WrappedCanvas } from '../components/CanvasRef';
import { fetchUserFavorites } from '../lib/api';
import { useMarkerContext, useUserContext } from '../lib/context';
import { initialPage, reducer } from '../lib/reducer';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../utils';

interface ResultContents {
  resultText: string[];
  link: string;
}

const TWITTER_FAVO_BASE_URL = 'https://twitter.com/hitoriblog/status';

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

  const webGLRendererCenter = useWebGLRenderer({ canvas: canvasCenterRef });

  const { arToolkitContext: arToolkitContextCenter, arToolkitSource: arToolkitSourceCenter } = useArToolkitInit(
    webGLRendererCenter,
  );

  const [res, setRes] = useState<TwitterUserFavorite[] | null>(null);
  const [state, dispatch] = useReducer(reducer, initialPage);
  const { pageNumber } = state;

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

  const resultContetns = useMemo<ResultContents>(() => {
    if (!res) return { resultText: [''], link: '' };
    const httpsIndex = res[pageNumber].text.indexOf('https');
    const text = res[pageNumber].text.slice(0, httpsIndex);
    const resultText = text.split(/(.{20})/).filter((e) => e);
    const link = `${TWITTER_FAVO_BASE_URL}/${res[pageNumber].id_str}`;
    return { resultText, link };
  }, [res, pageNumber]);

  const { resultText, link } = resultContetns;

  const { textLoader: textLoaderCenter } = useTextLoader({ test: resultText });
  const { textLoader: textLoaderLeft } = useTextLoader({ test: REFT });
  const { textLoader: textLoaderRight } = useTextLoader({ test: RIGHT });

  const increment = useCallback(() => {
    dispatch({ type: 'increment' });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: 'decrement' });
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
        decrement();
        return;
      }

      const intersectionRight = raycaster.intersectObject(textLoaderRight);
      if (intersectionRight.length > 0) {
        increment();
        return;
      }

      const intersectionCenter = raycaster.intersectObject(textLoaderCenter);
      if (intersectionCenter.length > 0) {
        window.open(link, '_blank');
        return;
      }
    };

    if (!webGLRendererCenter) return;
    webGLRendererCenter.domElement.addEventListener('click', handleClick);
    return () => {
      webGLRendererCenter.domElement.removeEventListener('click', handleClick);
    };
  }, [mouse, webGLRendererCenter, link]);

  useEffect(() => {
    groupCenter.add(textLoaderRight);
  }, [textLoaderRight]);

  useEffect(() => {
    groupCenter.add(textLoaderLeft);
  }, [textLoaderLeft]);

  useEffect(() => {
    if (!textLoaderCenter.text) return;
    groupCenter.add(textLoaderCenter);
    if (groupCenter.children.length === 4) {
      groupCenter.remove(groupCenter.children[groupCenter.children.length - 2]);
    }
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
