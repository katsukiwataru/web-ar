import { useRouter } from 'next/router';
// import { ParsedUrlQuery } from 'querystring';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getUser } from '../../lib/api';
import { useMarkerContext, useUserContext } from '../../lib/context';
import { useAnimationFrame, useArToolkitInit, useTextLoader, useWebGLRenderer } from '../../utils';

const User = () => {
  const { query } = useRouter();
  const { user, setUser } = useUserContext();
  const { setMarker } = useMarkerContext();
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
      const currentUser = user ? user : await getUser(query.screenName);
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
  }, [user, query]);

  const textLoader = useMemo(() => {
    const twitterScreenName = ` @${query.screenName} あああ`;
    return user ? [twitterScreenName, new Date(user.created_at).toLocaleString('ja-jp')] : [twitterScreenName, ''];
  }, [user, query]);

  useTextLoader(group, textLoader);
  // usePlaneMesh(group, textCanvasRef);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera });

  return <canvas id="canvas" ref={canvasRef} />;
};

export default User;
