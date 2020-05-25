import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export const NavbarRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          return (
          <>
            <Navbar history={props.history} />
            <Component {...props} />
            <Footer />
          </>
           ) ;
        }}
      />
    );
};
