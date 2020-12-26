import type { Dispatch, FC, SetStateAction } from 'react';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useUserContext } from '.';

export interface Marker {
  patternURL: string | null;
  setPatternURL: Dispatch<SetStateAction<string | null>>;
  markerURL: string | null;
  setMarkerURL: Dispatch<SetStateAction<string | null>>;
}

const Marker = createContext<Marker>({
  patternURL: null,
  setPatternURL: () => {},
  markerURL: null,
  setMarkerURL: () => {},
});

export const useMarkerContext = (): Marker => useContext(Marker);

export const MarkerContextProvider: FC = ({ children }) => {
  const { userContext } = useUserContext();
  const mounted = useRef(true);
  const { user } = userContext;
  const [patternURL, setPatternURL] = useState<string | null>(null);
  const [markerURL, setMarkerURL] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (!mounted.current) return;
    (async () => {
      const iconURL = user.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      const markerUrl: string = await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          resolve(markerUrl);
        });
      });
      setMarkerURL(markerUrl);
      THREEx.ArPatternFile.encodeImageURL(imgLocalURL, (pattern) => {
        const patternBlob = new Blob([pattern], { type: 'text/plain' });
        setPatternURL(URL.createObjectURL(patternBlob));
      });
    })();
    mounted.current = false;
  }, [user]);

  const value = useMemo(() => {
    return { patternURL, setPatternURL, markerURL, setMarkerURL };
  }, [patternURL, markerURL]);

  return <Marker.Provider value={value} children={children} />;
};
