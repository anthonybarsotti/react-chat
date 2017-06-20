
// Dependencies

import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  ConnectedRouter,
} from 'react-router-redux';
import {
  Route,
  Link,
} from 'react-router-dom';
import store, {
  history,
} from '../redux/store';

// Components
import PrivateRoute from '../containers/PrivateRoute';
import Login from '../containers/Login';

export default function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <div><Link to="/test">Protected Page</Link></div>
          <Route exact path="/" component={Login} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
