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

  const cameraClick = async () => {
    // setMarkerDisplay(false);
    const user = await getUser(screenName);
    setUser(user);
    history.push(`/user/${screenName}`);
  };
  const markerClick = async () => {
    // setMarkerDisplay(true);
    const user = await getUser(screenName);
    setUser(user);
    history.push(`/user/marker/${screenName}`);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 45 + '%',
        left: 50 + '%',
        transform: 'translate(-50%, -50%)',
        width: 50 + '%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      <p
        style={{
          fontSize: 18 + 'px',
        }}
      >
        twitter id
      </p>
      <input
        style={{
          paddingInlineEnd: 40,
          paddingInlineStart: 40,
          width: '-webkit-fill-available',
          height: 5 + 'vh',
          marginBottom: 30 + 'px',
          textAlign: 'center',
        }}
        type="text"
        placeholder="your twitter id"
        value={screenName}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        style={{
          width: 30 + '%',
          height: 5 + 'vh',
        }}
        onClick={markerClick}
      >
        Marker
      </button>
      <button
        type="button"
        style={{
          width: 30 + '%',
          height: 5 + 'vh',
        }}
        onClick={cameraClick}
      >
        Camera
      </button>
    </div>
  );
});
