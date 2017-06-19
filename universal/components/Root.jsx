
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
} from 'react-router-dom';
import store, {
  history,
} from '../redux/store';

// Components
import PrivateRoute from './PrivateRoute';
import Login from './Login';

export default function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={Login} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
