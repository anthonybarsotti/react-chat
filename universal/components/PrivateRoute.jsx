
// Dependencies
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  loggedIn,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (
      loggedIn
        ? (
          <Component {...props} />
        )
        : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        )
      )}
    />
  );
}
