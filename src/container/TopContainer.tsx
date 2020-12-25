import React, { Dispatch, memo, SetStateAction, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { TopTemplate } from '../components/templates/top';
import { useUserContext } from '../lib/context/';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

export const TopContainer = memo(() => {
  const { screenNameContext, userContext } = useUserContext();
  const { user, getUser } = userContext;
  const { screenName, setScreenName } = screenNameContext;
  const history = useHistory();

  useEffect(() => {
    const videoEl = document.getElementsByTagName('video');
    if (videoEl.length) videoEl[0].remove();
  }, []);

  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setScreenName(event.currentTarget.value);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      setScreenName(event.currentTarget.value);
      if (user?.screen_name === event.currentTarget.value) return;
      if (event.key === 'Enter') {
        getUser(event.currentTarget.value);
      }
    },
    [user],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setScreenName(event.target.value);
      if (user?.screen_name === event.currentTarget.value) return;
      getUser(event.currentTarget.value);
    },
    [user],
  );

  const cameraClick = useCallback(() => {
    history.push(`/user/${screenName}`);
  }, [screenName]);

  const markerClick = useCallback(() => {
    history.push(`/marker/${screenName}`);
  }, [screenName]);

  return (
    <TopTemplate
      screenName={screenName}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      cameraClick={cameraClick}
      markerClick={markerClick}
    />
  );
});
