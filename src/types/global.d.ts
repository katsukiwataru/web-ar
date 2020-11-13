import type Three from 'three';
import type THREEx from './THREEx';

declare global {
  const THREE: typeof Three;
  const THREEx: THREEx;

  interface Window {
    THREE?: typeof THREE;
    THREEx?: typeof THREEx;
  }
}
