import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { getUser } from '../../../lib/api';
import { useMarkerContext, useUserContext } from '../../../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../../../utils';
import styles from './user.css';

export const UserComponent = memo(() => {
  const { user, setUser } = useUserContext();
  const { setMarker } = useMarkerContext();
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
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
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
      userPattern();
      return;
    }
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl,
      changeMatrixMode: 'modelViewMatrix',
    });
  }, [patternUrl]);

  const userPattern = useCallback(() => {
    (async () => {
      const currentUser = user ? user : await getUser(screenName);
      setUser(currentUser);
      const iconURL = currentUser.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          resolve(markerUrl);
          setMarker(markerUrl);
        });
      });

      THREEx.ArPatternFile.encodeImageURL(imgLocalURL, (pattern) => {
        const patternBlob = new Blob([pattern], { type: 'text/plain' });
        setPatternUrl(URL.createObjectURL(patternBlob));
      });
    })();
  }, [user, screenName]);

  const textLoad = useMemo(() => {
    const twitterScreenName = `@${screenName}`;
    return user ? [twitterScreenName, new Date(user.created_at).toLocaleString('ja-jp')] : [twitterScreenName, ''];
  }, [user]);

  useTextLoader(group, textLoad[0], 0.75);
  useTextLoader(group, textLoad[1], 0.5);
  // usePlaneMesh(group, textCanvasRef);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera });

  return (
    <div className={styles.container}>
      <canvas id="canvas" ref={canvasRef} />
      <canvas className={styles.text} ref={textCanvasRef} />
    </div>
  );
});
