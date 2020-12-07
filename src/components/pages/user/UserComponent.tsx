import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useWebGLRenderer } from '../../utils/useWebGLRenderer';
import { useAnimationFrame } from '../../utils/useAnimation';
import { useArToolkitInit } from '../../utils/useArToolkit';
import { useTextLoader } from '../../utils/useTextLoader';
import { useRouteMatch } from 'react-router';

export const UserComponent = memo(() => {
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
  // const history = useHistory();
  const { arToolkitContext, arToolkitSource } = useArToolkitInit(webGLRenderer, perspectiveCamera);

  useEffect(() => {
    if (!mounted.current) return;
    if (!patternUrl) {
      (async () => {
        const apiURL = new URL(`https://api.yue.coffee/api/twitter-user/v1`);
        apiURL.searchParams.append('screenName', screenName);
        apiURL.searchParams.append('key', '0f1b85d5-5c6f-4d6e-9231-ca383d5d0313');
        const res = await fetch(apiURL.href);
        const { data }: { data: { user: { profile_image_url_https: string } } } = await res.json();
        const iconURL = await new Promise<string>((resolve) => resolve(data.user.profile_image_url_https));

        const imgDataRes = await fetch(iconURL);
        const imgData = await imgDataRes.blob();

        console.log({ iconURL });
        await new Promise((resolve) => {
          THREEx.ArPatternFile.buildFullMarker(URL.createObjectURL(imgData), 0.5, 512, 'blank', (markerUrl) => {
            console.log({ markerUrl });
            var domElement = window.document.createElement('a');
            domElement.href = markerUrl;
            domElement.download = 'pattern-' + (screenName || 'marker') + '.png';
            document.body.appendChild(domElement);
            domElement.click();
            document.body.removeChild(domElement);
            resolve(markerUrl);
          });
        });

        THREEx.ArPatternFile.encodeImageURL(iconURL, (pattern) => {
          const patternBlob = new Blob([pattern], { type: 'text/plain' });
          setPatternUrl(window.URL.createObjectURL(patternBlob));
        });
      })();
    }
    new THREEx.ArMarkerControls(arToolkitContext, group, {
      type: 'pattern',
      patternUrl,
      changeMatrixMode: 'modelViewMatrix',
    });
    scene.add(perspectiveCamera);
    scene.add(group);
    mounted.current = false;
  }, [patternUrl]);

  const geometry = useMemo(() => {
    return new THREE.PlaneBufferGeometry(1, 1);
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // colorWrite: false,
      // depthWrite: false,
    });
  }, []);

  const markerPlane = useMemo(() => {
    return new THREE.Mesh(geometry, material);
  }, [geometry, material]);

  useEffect(() => {
    group.add(markerPlane);
  }, [markerPlane]);

  useTextLoader(group, location.pathname);

  const mouse = new THREE.Vector2();

  const handleClick = (event: MouseEvent) => {
    const element = event.target;
    if (!(element instanceof HTMLCanvasElement)) return;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
    // const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1);
  };

  useEffect(() => {
    if (!webGLRenderer) return;
    webGLRenderer.domElement.addEventListener('click', handleClick);
    return () => {
      webGLRenderer.domElement.removeEventListener('click', handleClick);
    };
  }, [webGLRenderer]);

  useAnimationFrame({ arToolkitSource, arToolkitContext, webGLRenderer, scene, perspectiveCamera, mouse, markerPlane });

  return <canvas ref={canvasRef}></canvas>;
});
