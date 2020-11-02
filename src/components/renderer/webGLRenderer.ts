export const width = window.innerWidth;
export const height = window.innerHeight;

const renderer = () => {
  const webGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  webGLRenderer.setPixelRatio(window.devicePixelRatio);
  webGLRenderer.setClearColor(new THREE.Color(), 0);
  webGLRenderer.setSize(width, height);
  webGLRenderer.domElement.style.position = 'absolute';
  webGLRenderer.domElement.style.top = '0px';
  webGLRenderer.domElement.style.left = '0px';
  return { webGLRenderer };
};

export const { webGLRenderer } = renderer();
