import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
const Top = lazy(() =>
  import(
    /* webpackChunkName: "top" */
    './pages/top/TopComponent'
  ).then((module) => ({ default: module.TopComponent })),
);
const User = lazy(() =>
  import(
    /* webpackChunkName: "user" */
    './pages/user/UserComponent'
  ).then((module) => ({ default: module.UserComponent })),
);

export const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_PATH}>
      <Switch>
        <Suspense fallback={<div>loading</div>}>
          <Route exact path="/" component={Top} />
          <Route exact path="/user/:screenName" component={User} />
        </Suspense>
      </Switch>
    </HashRouter>
  );
};
