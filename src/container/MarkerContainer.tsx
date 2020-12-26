import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { MarkerTemplate } from '../components/templates/';
import { useMarkerContext, useUserContext } from '../lib/context';

export const MarkerContainer = () => {
  const { userContext } = useUserContext();
  const { user, getUser } = userContext;
  const { markerURL } = useMarkerContext();
  const {
    params: { screenName },
  } = useRouteMatch<{ screenName: string }>();

  useEffect(() => {
    getUser(screenName);
  }, [screenName]);

  return <MarkerTemplate user={user} markerURL={markerURL} />;
};
