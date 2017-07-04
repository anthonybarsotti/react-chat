
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

import App from '../containers/App';

export default function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
