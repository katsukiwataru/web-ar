import React, { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { fetchUser } from '../api';

export interface UserContext {
  userContext: {
    user: TwitterUser | null;
    getUser: (screenName: string) => void;
  };
  screenNameContext: {
    screenName: string;
    setScreenName: Dispatch<SetStateAction<string>>;
  };
}

const UserContext = createContext<UserContext>({
  userContext: {
    user: null,
    getUser: () => {},
  },
  screenNameContext: {
    screenName: '',
    setScreenName: () => {},
  },
});

export const useUserContext = (): UserContext => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<TwitterUser | null>(null);
  const [screenName, setScreenName] = useState<string>('');

  const getUser = useCallback(
    async (screenName: string) => {
      if (!screenName) return;
      if (user?.screen_name === screenName) return;
      const currentUser = await fetchUser(screenName);
      if (!currentUser) return;
      setUser(currentUser);
    },
    [user],
  );

  const userContext = useMemo(() => {
    return { user, getUser } as const;
  }, [user]);

  const screenNameContext = useMemo(() => {
    return { screenName, setScreenName } as const;
  }, [screenName]);

  const value = useMemo(() => {
    return { userContext, screenNameContext } as const;
  }, [userContext, screenNameContext]);

  return <UserContext.Provider value={value} children={children} />;
};
