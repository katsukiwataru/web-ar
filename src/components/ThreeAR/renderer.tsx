export function renderSample(el: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(new THREE.Color(), 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';
  renderer.domElement.style.left = '0px';
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.visible = false;
  const camera = new THREE.Camera();
  scene.add(camera);

  const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
  });

  arToolkitSource.init(() => {
    setTimeout(() => {
      onResize();
    }, 1000);
  });

  addEventListener('resize', () => {
    onResize();
  });

  function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }

  const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'data/camera_para.dat',
    detectionMode: 'mono',
  });

  arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'pattern',
    patternUrl: 'data/patt.hiro',
    changeMatrixMode: 'cameraTransformMatrix',
  });
  // need to declare CubeGeometry type
  // @ts-ignore
  const cube = new THREE.CubeGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(cube, new THREE.MeshNormalMaterial());
  mesh.position.y = 1.0;
  scene.add(mesh);

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    if (arToolkitSource.ready) {
      arToolkitContext.update(arToolkitSource.domElement);
      scene.visible = camera.visible;
    }
    const delta = clock.getDelta();
    mesh.rotation.x += delta * 1.0;
    mesh.rotation.y += delta * 1.5;
    renderer.render(scene, camera);
  };
  requestAnimationFrame(animate);
}
