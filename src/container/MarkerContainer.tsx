import React from 'react';
import { MarkerTemplate } from '../components/templates/';
import { useMarkerContext, useUserContext } from '../lib/context';

export const MarkerContainer = () => {
  const { userContext } = useUserContext();
  const { user } = userContext;
  const { markerURL } = useMarkerContext();

  return <MarkerTemplate user={user} markerURL={markerURL} />;
};
