import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RootComponent } from './Three/RootComponent';
import { ThreeComponent } from './Three/ThreeComponent';
// import { Three } from './sample';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <RootComponent />
          </Route>
          <Route exact path="/three">
            <ThreeComponent />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
