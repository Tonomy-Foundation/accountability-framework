import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import Todo from './pages/Todo';
import Login from './pages/Login';
import { NavbarRoute } from './components/NavbarRoute'

const routes = [
  { path: '/login', component: Login, exact: true },
  { path: '/', component: Todo, exact: true },
];

const Routes = () => (
  <Router>
    <Switch>
      {routes.map(route => (
        <NavbarRoute {...route} key={route.path} />
      ))}
    </Switch>
  </Router>
);

export default Routes;
