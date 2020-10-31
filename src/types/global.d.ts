import type THREEx from './THREEx';

declare global {
  const THREE: typeof THREE;
  const THREEx: THREEx;

  interface Window {
    THREE?: typeof THREE;
    THREEx?: typeof THREEx;
  }
}
