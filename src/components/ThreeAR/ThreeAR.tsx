import React, { lazy, Suspense } from 'react';

const Script = lazy(() => import('../../components/Helmet/ARScript').then((module) => ({ default: module.ARScript })));

export const ThreeAR = () => {
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
