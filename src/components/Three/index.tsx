import React, { useEffect, useRef } from 'react';
import { render } from '../utils/render';

export const Three = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    render(ref.current);
  }, [ref.current]);
  return <div ref={ref}></div>;
};
