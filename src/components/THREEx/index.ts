import { camera } from '../camera';
import { webGLRenderer } from '../renderer/webGLRenderer';

const arToolkitSource = new THREEx.ArToolkitSource({
  sourceType: 'webcam',
  displayWidth: window.innerWidth,
  displayHeight: window.innerHeight,
});

const arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: 'data/camera_para.dat',
  detectionMode: 'mono',
});

const arMarkerControls = () => {
  new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'pattern',
    patternUrl: 'data/patt.hiro',
    changeMatrixMode: 'cameraTransformMatrix',
  });
};

const onResize = () => {
  arToolkitSource.onResizeElement();
  arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
  }
};

arToolkitSource.init(() => {
  arMarkerControls();
  setTimeout(() => {
    onResize();
  }, 1000);
});

window.addEventListener('resize', () => {
  onResize();
});

arToolkitContext.init(() => {
  camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

export { arToolkitSource, arToolkitContext };
