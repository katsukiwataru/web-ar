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
      }}
    >
      {user && <p>@{user.screen_name}</p>}
      {markerURL && (
        <img
          src={markerURL}
          alt="marker"
          style={{
            width: 100 + '%',
            height: 100 + '%',
            maxWidth: 580 + 'px',
          }}
        />
      )}
    </div>
  );
});
