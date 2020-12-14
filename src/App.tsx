import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContextProvider, UserMarkerContextProvider } from './lib/context';

const Top = lazy(() =>
  import(
    /* webpackChunkName: "top" */
    './components/pages/top/TopComponent'
  ).then((module) => ({ default: module.TopComponent })),
);
const User = lazy(() =>
  import(
    /* webpackChunkName: "user" */
    './components/pages/user/UserComponent'
  ).then((module) => ({ default: module.UserComponent })),
);
const Marker = lazy(() =>
  import(
    /* webpackChunkName: "user" */
    './components/pages/marker/MarkerComponent'
  ).then((module) => ({ default: module.MarkerComponent })),
);

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserContextProvider>
          <UserMarkerContextProvider>
            <Suspense fallback={<div>loading</div>}>
              <Route exact path="/" component={Top} />
              <Route exact path="/user/:screenName" component={User} />
              <Route exact path="/user/marker/:screenName" component={Marker} />
            </Suspense>
          </UserMarkerContextProvider>
        </UserContextProvider>
      </Switch>
    </BrowserRouter>
  );
};
