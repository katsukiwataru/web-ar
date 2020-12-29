import React, { memo } from 'react';

interface Props {
  user: TwitterUser | null;
  markerURL: string | null;
}

export const MarkerTemplate = memo<Props>(({ user, markerURL }) => {
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
});
