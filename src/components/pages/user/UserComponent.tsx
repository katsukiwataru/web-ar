import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { getUser } from '../../../lib/api';
import { useUserContext } from '../../../lib/context/userContext';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../../../utils';

export const UserComponent = memo(() => {
  const { user } = useUserContext();
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();
  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);
  const group = useMemo(() => {
    return new THREE.Group();
  }, []);
  const perspectiveCamera = useMemo(() => {
    return new THREE.PerspectiveCamera();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webGLRenderer = useWebGLRenderer(canvasRef);
  const mounted = useRef(true);
  const [patternUrl, setPatternUrl] = useState<string | null>(null);
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  useEffect(() => {
    if (!mounted.current) return;
    scene.add(perspectiveCamera);
    scene.add(group);
    mounted.current = false;
  }, []);

  useEffect(() => {
    if (!patternUrl) {
      currentUser();
      return;
    }
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl,
      changeMatrixMode: 'modelViewMatrix',
    });
  }, [patternUrl]);

  const currentUser = useCallback(() => {
    (async () => {
      const currentUser = user ? user : await getUser(screenName);
      console.log(currentUser, user);
      const iconURL = currentUser.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          const domElement = window.document.createElement('a');
          domElement.href = markerUrl;
          domElement.download = 'pattern-' + (screenName || 'marker') + '.png';
          document.body.appendChild(domElement);
          domElement.click();
          document.body.removeChild(domElement);
          resolve(markerUrl);
        });
      });

      THREEx.ArPatternFile.encodeImageURL(imgLocalURL, (pattern) => {
        const patternBlob = new Blob([pattern], { type: 'text/plain' });
        setPatternUrl(URL.createObjectURL(patternBlob));
      });
    })();
  }, [user, screenName]);

  useTextLoader(group, screenName);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera });

  return <canvas ref={canvasRef}></canvas>;
});
