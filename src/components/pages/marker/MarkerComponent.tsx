import React from 'react';
import { useMarkerContext } from '../../../lib/context';

export const MarkerComponent = () => {
  const { marker } = useMarkerContext();
  return <div>{marker && <img src={marker} alt="marker" />}</div>;
};
