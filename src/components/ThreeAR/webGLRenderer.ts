export const renderer = () => {
  const webGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  webGLRenderer.setClearColor(new THREE.Color(), 0);
  webGLRenderer.setSize(window.innerWidth, window.innerHeight);
  webGLRenderer.domElement.style.position = 'absolute';
  webGLRenderer.domElement.style.top = '0px';
  webGLRenderer.domElement.style.left = '0px';
  return { webGLRenderer };
};
