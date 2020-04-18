import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Todo from './pages/Todo';
import Login from './pages/Login';
import PeopleView from './pages/PeopleView';

const routes = [
  { path: '/login', component: Login, exact: true },
  // { path: '/people/@:account_name', component: PeopleView, exact: true },
  { path: '/people', component: PeopleView, exact: true },
  { path: '/', component: Todo, exact: true },
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
