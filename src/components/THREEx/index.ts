import { height, width } from '../consts';
import { webGLRenderer } from '../renderer/webGLRenderer';

const arToolkitSetting = () => {
  const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
    displayWidth: width,
    displayHeight: height,
  });

  const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'data/camera_para.dat',
    detectionMode: 'mono',
  });

  const onResize = () => {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  };

  return { arToolkitSource, arToolkitContext, onResize };
};

export const { arToolkitSource, arToolkitContext, onResize } = arToolkitSetting();
