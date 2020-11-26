import React, { useEffect, useRef } from 'react';
import { renderSample } from './renderSample';

export const Three = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    renderSample(ref.current);
  }, [ref.current]);

  return <div ref={ref} />;
};
