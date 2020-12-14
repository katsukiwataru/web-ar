import React, { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';

export interface Marker {
  marker: string | null;
  setMarker: Dispatch<SetStateAction<string | null>>;
}

const Marker = createContext<Marker>({
  marker: null,
  setMarker: () => {},
});

export const useMarkerContext = (): Marker => useContext(Marker);

export const UserMarkerContextProvider: FC = ({ children }) => {
  const [marker, setMarker] = useState<string | null>(null);

  const value = useMemo(() => {
    return { marker, setMarker };
  }, [marker]);

  return <Marker.Provider value={value} children={children} />;
};
