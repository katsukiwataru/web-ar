import type THREEx from './THREEx.d';

declare global {
  // for convience this is not type safe
  const THREE: typeof THREE;
  const THREEx: THREEx;

  interface Window {
    THREE?: typeof THREE;
    THREEx?: THREEx;
  }
}
