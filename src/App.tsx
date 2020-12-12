import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './lib/context/userContext';
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

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppContextProvider>
          <Suspense fallback={<div>loading</div>}>
            <Route exact path="/" component={Top} />
            <Route exact path="/user/:screenName" component={User} />
          </Suspense>
        </AppContextProvider>
      </Switch>
    </BrowserRouter>
  );
};
