import React, { useEffect, useRef } from 'react';
import { renderSample } from './renderer';

export const ThreeAR = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    renderSample(ref.current);
  }, []);
  return <div ref={ref}></div>;
};
