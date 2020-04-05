import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';

const routes = [
  { path: '/', component: Dashboard, exact: true },
  { path: '/login', component: Login, exact: true }
];

const Routes = () => (
  <Router>
    <Switch>
      {routes.map(route => (
        <Route {...route} key={route.path} />
      ))}
    </Switch>
  </Router>
);

export default Routes;
