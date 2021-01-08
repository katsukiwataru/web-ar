import type three from 'three';
import type THREEx from './THREEx';

declare global {
  const THREE: typeof three;
  const THREEx: THREEx;
  interface Window {
    THREE?: typeof THREE;
    THREEx?: THREEx;
  }
}
