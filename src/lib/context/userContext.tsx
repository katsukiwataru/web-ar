import React, { createContext, Dispatch, FC, SetStateAction, useContext, useMemo, useState } from 'react';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export const useUserContext = (): UserContext => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Twitter | null>(null);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <UserContext.Provider value={value} children={children} />;
};
