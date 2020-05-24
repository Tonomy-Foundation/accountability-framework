import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import OrgView from './pages/OrgView';
import PeopleView from './pages/PeopleView';

const routes = [
  { path: '/org/:accountName', component: OrgView, exact: true },
  { path: '/people/:accountName', component: PeopleView, exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/', component: Home, exact: true },
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
