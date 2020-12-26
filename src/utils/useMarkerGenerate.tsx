import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { fetchUser } from '../lib/api';
import { useUserContext } from '../lib/context';

export const useMarkerGenerate = () => {
  const { userContext } = useUserContext();
  const { user } = userContext;

  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  const [patternUrl, setPatternUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const currentUser = user ? user : await fetchUser(screenName);
      const iconURL = currentUser.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          resolve(markerUrl);
        });
      });
      THREEx.ArPatternFile.encodeImageURL(imgLocalURL, (pattern) => {
        const patternBlob = new Blob([pattern], { type: 'text/plain' });
        setPatternUrl(URL.createObjectURL(patternBlob));
      });
    })();
  }, [user, screenName]);

  return patternUrl;
};
