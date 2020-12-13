import type { Dispatch, SetStateAction } from 'react';
import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getUser } from '../../../lib/api';
import { useUserContext } from '../../../lib/context/userContext';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

export const TopComponent = memo(() => {
  const { setUser } = useUserContext();
  const [screenName, setScreenName] = useState('');
  const history = useHistory();

  useEffect(() => {
    const videoEl = document.getElementsByTagName('video');
    if (videoEl.length) videoEl[0].remove();
  }, []);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setScreenName(event.currentTarget.value);
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const user = await getUser(screenName);
      setUser(user);
      history.push(`/user/${screenName}`);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <p style={{ textAlign: 'center' }}>twitter id</p>
      <input type="text" value={screenName} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
});
