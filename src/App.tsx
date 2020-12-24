import React from 'react';
import { UserContextProvider, UserMarkerContextProvider } from './lib/context';
import { Router } from './lib/router/route';

export const App = () => {
  return (
    <UserContextProvider>
      <UserMarkerContextProvider>
        <Router />
      </UserMarkerContextProvider>
    </UserContextProvider>
  );
};
