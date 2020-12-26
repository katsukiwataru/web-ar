import React from 'react';
import { useMarkerContext, useUserContext } from '../lib/context';

export const MarkerContainer = () => {
  const { userContext } = useUserContext();
  const { user } = userContext;
  const { markerURL } = useMarkerContext();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column',
        margin: 70,
      }}
    >
      {user && <p>@{user.screen_name}</p>}
      {markerURL && <img src={markerURL} alt="marker" />}
    </div>
  );
};
