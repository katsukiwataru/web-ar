import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RootComponent } from './pages/RootComponent';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RootComponent} />
      </Switch>
    </BrowserRouter>
  );
};
