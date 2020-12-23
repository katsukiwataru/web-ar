import HEAD from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getUser } from '../../lib/api';
import { useMarkerContext, useUserContext } from '../../lib/context';
import { useAnimationFrame, useTextLoader, useWebGLRenderer } from '../../utils';

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
  // const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  const arToolkitSource = useMemo(() => {
    return new THREEx.ArToolkitSource({
      sourceType: 'webcam',
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight,
    });
  }, []);

  const arToolkitContext = useMemo(() => {
    return new THREEx.ArToolkitContext({
      cameraParametersUrl: '/camera_para.dat',
      detectionMode: 'mono',
    });
  }, []);

  useEffect(() => {
    const onResize = () => {
      arToolkitSource.onResizeElement();
      if (!webGLRenderer) return;
      arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      }
    };

    arToolkitContext.init(() => {
      perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    arToolkitSource.init(() => {
      setTimeout(() => {
        onResize();
      }, 1000);
    });

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [perspectiveCamera]);

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
    if (typeof window === 'undefined') return;
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

  return (
    <>
      <HEAD>
        {/* <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js"></script>
        <script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"></script> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/3.1.0/three.js/build/ar.js"></script>
        <script
          defer
          src="https://rawcdn.githack.com/AR-js-org/AR.js/a5619a021e6ff40427ff8f9c62169e99a390f56b/three.js/examples/marker-training/threex-arpatternfile.js"
        ></script>
      </HEAD>
      <canvas id="canvas" ref={canvasRef} />
    </>
  );
};

export default User;
