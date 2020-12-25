import React, { Dispatch, memo, SetStateAction, useCallback, useEffect } from 'react';
import { TopTemplate } from '../components/templates/top';
import { useUserContext } from '../lib/context/';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

export const TopContainer = memo(() => {
  const { screenNameContext, userContext } = useUserContext();
  const { getUser } = userContext;
  const { screenName, setScreenName } = screenNameContext;
  // const history = useHistory();

  useEffect(() => {
    const videoEl = document.getElementsByTagName('video');
    if (videoEl.length) videoEl[0].remove();
  }, []);

  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setScreenName(event.currentTarget.value);
  }, []);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    setScreenName(event.currentTarget.value);
    if (event.key === 'Enter') {
      getUser(event.currentTarget.value);
    }
  }, []);

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setScreenName(event.target.value);
    getUser(event.currentTarget.value);
  }, []);

  // const cameraClick = useCallback(async () => {
  //   const user = await fetchUser(screenName);
  //   setUser(user);
  //   history.push(`/user/${screenName}`);
  // }, []);

  // const markerClick = useCallback(async () => {
  //   const user = await fetchUser(screenName);
  //   setUser(user);
  //   history.push(`/marker/${screenName}`);
  // }, []);

  return <TopTemplate screenName={screenName} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />;
});
