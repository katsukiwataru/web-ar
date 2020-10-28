import React, { lazy, Suspense } from 'react';
import * as THREE from 'three';

const Script = lazy(() => import('../components/Helmet/ARScript').then((module) => ({ default: module.Script })));

export const App = () => {
  window.THREE = THREE;
  return (
    <Suspense
      fallback={
        <div>
          <p>loading</p>
        </div>
      }
    >
      <Script />
    </Suspense>
  );
};
