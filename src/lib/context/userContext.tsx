import React, { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

export const AppContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export const useUserContext = (): UserContext => useContext(AppContext);

export const AppContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Twitter | null>(null);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <AppContext.Provider value={value} children={children} />;
};
