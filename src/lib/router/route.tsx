import loadable from '@loadable/component';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Loading = () => (
  <div>
    <p>Loading</p>
  </div>
);

const Top = loadable(async () => {
  const { TopComponent } = await import(/* webpackChunkName: "top" */ '../../pages/');
  return () => <TopComponent />;
});

const User = loadable(
  async () => {
    const { UserComponent } = await import(/* webpackChunkName: "user" */ '../../pages/user/');
    return () => <UserComponent />;
  },
  { fallback: <Loading /> },
);

const Marker = loadable(
  async () => {
    const { MarkerComponent } = await import(/* webpackChunkName: "marker" */ '../../pages/marker/');
    return () => <MarkerComponent />;
  },
  {
    fallback: <Loading />,
  },
);

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/user/:screenName" component={User} />
        <Route exact path="/user/marker/:screenName" component={Marker} />
      </Switch>
    </BrowserRouter>
  );
};
