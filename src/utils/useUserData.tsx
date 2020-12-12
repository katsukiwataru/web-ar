import { useEffect, useState } from 'react';
import { getUser } from '../lib/api';

export const useUserData = (screenName: string) => {
  const [userData, setUserData] = useState<Twitter | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getUser(screenName);
      setUserData(data);
    })();
  }, [screenName]);

  return userData;
};
