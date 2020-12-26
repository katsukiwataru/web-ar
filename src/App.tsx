import React from 'react';
import { MarkerContextProvider, UserContextProvider } from './lib/context';
import { Router } from './lib/router/route';

export const App = () => {
  return (
    <UserContextProvider>
      <MarkerContextProvider>
        <Router />
      </MarkerContextProvider>
    </UserContextProvider>
  );
};
