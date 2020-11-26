import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Three } from './sample';
import { RootComponent } from './Three/RootComponent';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <RootComponent />
          </Route>
          <Route exact path="/three">
            <Three />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
