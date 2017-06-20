
// Dependencies

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import logger from 'redux-logger';

// Modules

import account from './modules/account';

// Constants

export const history = createHistory();
const middlewares = [];
middlewares.push(routerMiddleware(history));

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const rootReducer = combineReducers({
  account,
  router: routerReducer,
});

export default createStore(rootReducer, applyMiddleware(...middlewares));
