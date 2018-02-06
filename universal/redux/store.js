
// Dependencies
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import socketMiddleware from './middleware/socket';

// Reducers
import account from './modules/account';
import socket from './modules/socket';

// Constants
export const history = createHistory();
const middlewares = [
  routerMiddleware(history),
  socketMiddleware(),
];

if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const rootReducer = combineReducers({
  account,
  socket,
  router: routerReducer,
});

export default createStore(rootReducer, applyMiddleware(...middlewares));
