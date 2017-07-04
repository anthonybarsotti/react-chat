
// Dependencies

import {
  connect,
} from 'react-redux';

// Actions

import {
  connectToSocketServer,
  disconnectFromSocketServer,
} from '../redux/modules/socket';

// Components

import App from '../components/App';

export default connect(null, {
  connectToSocketServer,
  disconnectFromSocketServer,
})(App);
