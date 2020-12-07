import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const Top = lazy(() =>
  import(
    /* webpackChunkName: "top" */
    './pages/top/RootComponent'
  ).then((module) => ({ default: module.RootComponent })),
);
const User = lazy(() =>
  import(
    /* webpackChunkName: "user" */
    './pages/user/UserComponent'
  ).then((module) => ({ default: module.UserComponent })),
);

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>loading</div>}>
          <Route exact path="/" component={Top} />
          <Route exact path="/user/:screenName" component={User} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};
