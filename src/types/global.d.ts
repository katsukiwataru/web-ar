import type Three from 'three';
import type THREEx from './THREEx';

declare global {
  const THREEx: THREEx;
  interface Window {
    THREE?: typeof Three;
    THREEx?: typeof THREEx;
  }
}
