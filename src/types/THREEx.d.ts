declare class ArToolkitSource {
  constructor(
    parameters: Partial<{
      // type of source - ['webcam', 'image', 'video']
      sourceType: 'webcam' | 'image' | 'video';
      // url of the source - valid if sourceType = image|video
      sourceUrl: string | null;

      // Device id of the camera to use (optional)
      deviceId: string | null;

      // resolution of at which we initialize in the source image
      sourceWidth: number;
      sourceHeight: number;
      // resolution displayed for the source
      displayWidth: number;
      displayHeight: number;
    }>,
  );
  ready: boolean;
  domElement: HTMLElement | null;
  init(onReady?: Function, onError?: Function): ArToolkitSource;
  onResizeElement(): void;
  copyElementSizeTo(e: HTMLElement): void;
}

declare class ArToolkitContext {
  constructor(
    parameters: Partial<{
      // AR backend - ['artoolkit']
      trackingBackend: string;
      // debug - true if one should display artoolkit debug canvas, false otherwise
      debug: boolean;
      // the mode of detection - ['color', 'color_and_matrix', 'mono', 'mono_and_matrix']
      detectionMode: string;
      // type of matrix code - valid iif detectionMode end with 'matrix' - [3x3, 3x3_HAMMING63, 3x3_PARITY65, 4x4, 4x4_BCH_13_9_3, 4x4_BCH_13_5_5]
      matrixCodeType: string;

      // url of the camera parameters
      cameraParametersUrl: string;

      // tune the maximum rate of pose detection in the source image
      maxDetectionRate: number;
      // resolution of at which we detect pose in the source image
      canvasWidth: number;
      canvasHeight: number;

      // the patternRatio inside the artoolkit marker - artoolkit only
      patternRatio: number;

      // enable image smoothing or not for canvas copy - default to true
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
      imageSmoothingEnabled: boolean;
    }>,
    sourceParameters?: any,
  );
  arController: any;
  init(onCompleted: Function): void;
  update(srcElement: HTMLElement | null): boolean;
  getProjectionMatrix(): THREE.Matrix4;
}

declare class ArMarkerControls {
  constructor(
    context: ArToolkitContext,
    object3d: THREE.Object3D,
    parameters: Partial<{
      // size of the marker in meter
      size: number;
      // type of marker - ['pattern', 'barcode', 'nft', 'unknown' ]
      type: 'pattern' | 'barcode' | 'nft' | 'unknown';
      // url of the pattern - IIF type='pattern'
      patternUrl: string | null;
      // value of the barcode - IIF type='barcode'
      barcodeValue: string | null;
      // url of the descriptors of image - IIF type='nft'
      descriptorsUrl: string | null;
      // change matrix mode - [modelViewMatrix, cameraTransformMatrix]
      changeMatrixMode: 'modelViewMatrix' | 'cameraTransformMatrix';
      // minimal confidence in the marke recognition - between [0, 1] - default to 1
      minConfidence: number;
      // turn on/off camera smoothing
      smooth: boolean;
      // number of matrices to smooth tracking over, more = smoother but slower follow
      smoothCount: number;
      // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
      smoothTolerance: number;
      // threshold for smoothing, will keep still unless enough matrices are over tolerance
      smoothThreshold: number;
    }>,
  );
}

export default interface THREEx {
  ArToolkitSource: typeof ArToolkitSource;
  ArToolkitContext: typeof ArToolkitContext;
  ArMarkerControls: typeof ArMarkerControls;
}
