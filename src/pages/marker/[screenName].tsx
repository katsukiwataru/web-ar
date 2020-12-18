import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../lib/api';
import { useMarkerContext, useUserContext } from '../../lib/context';

// type Arrayify<T> = {[P in keyof T]: Array<T[P]>}

// type ScreenName = Arrayify<NextRouter>;

const Marker = () => {
  const { query } = useRouter();
  const { user, setUser } = useUserContext();
  const { marker } = useMarkerContext();
  const [currentMarker, serCurrentMarker] = useState<string | null>(null);

  useEffect(() => {
    if (!currentMarker) {
      userPattern();
      return;
    }
  }, [currentMarker]);

  const userPattern = useCallback(() => {
    (async () => {
      const currentUser = user ? user : await getUser(query.screenName);
      setUser(currentUser);
      console.log(currentUser);
      const iconURL = currentUser.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          resolve(markerUrl);
          serCurrentMarker(markerUrl);
        });
      });
    })();
  }, [user, query]);

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
      {marker && <img src={marker} alt="marker" />}
      {currentMarker && <img src={currentMarker} alt="marker" />}
    </div>
  );
};

export default Marker;
