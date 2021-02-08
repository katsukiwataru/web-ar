import loadable from '@loadable/component';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Loading = () => (
  <div>
    <p>Loading</p>
  </div>
);

const Top = loadable(
  async () => {
    const { TopPage } = await import(/* webpackChunkName: "top" */ '../../pages/');
    return () => <TopPage />;
  },
  { fallback: <Loading /> },
);

const Camera = loadable(
  async () => {
    const { CameraPage } = await import(/* webpackChunkName: "user" */ '../../pages/camera/');
    return () => <CameraPage />;
  },
  { fallback: <Loading /> },
);

const Marker = loadable(
  async () => {
    const { MarkerPage } = await import(/* webpackChunkName: "marker" */ '../../pages/marker/');
    return () => <MarkerPage />;
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
        <Route exact path="/camera/:screenName" component={Camera} />
        <Route exact path="/marker/:screenName" component={Marker} />
      </Switch>
    </BrowserRouter>
  );
};
