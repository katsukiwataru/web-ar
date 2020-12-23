import HEAD from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../lib/api';
import { useMarkerContext, useUserContext } from '../../lib/context';

const Marker = () => {
  const { query } = useRouter();
  const { user, setUser } = useUserContext();
  const { marker } = useMarkerContext();
  const [currentMarker, serCurrentMarker] = useState<string | null>(null);

  useEffect(() => {
    if (!currentMarker) {
      (async () => {
        const currentUser = user ? user : await getUser(query.screenName);
        setUser(currentUser);
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
      return;
    }
  }, [currentMarker, user, query]);

  return (
    <>
      <HEAD>
        {/* <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js"></script>
        <script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"></script> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/3.1.0/three.js/build/ar.js"></script>
        <script
          defer
          src="https://rawcdn.githack.com/AR-js-org/AR.js/a5619a021e6ff40427ff8f9c62169e99a390f56b/three.js/examples/marker-training/threex-arpatternfile.js"
        ></script>
      </HEAD>
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
    </>
  );
};

export default Marker;
