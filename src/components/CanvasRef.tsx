import React, { forwardRef } from 'react';

export const WrappedCanvas = forwardRef<HTMLCanvasElement>((_props, ref) => {
  return <canvas ref={ref} />;
});
