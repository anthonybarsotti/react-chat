/* globals window, WebSocket */
// Dependencies
import {
  CONNECT_TO_SOCKET_SERVER,
  DISCONNECT_FROM_SOCKET_SERVER,
  socketConnecting,
  socketConnected,
  socketError,
} from '../modules/socket';

let socket = null;

const connectToSocketServer = function connectToSocketServer(store) {
  socket = new WebSocket(window.location.href.replace(/https?:\/\//, 'ws://'));
  store.dispatch(socketConnecting());

  socket.addEventListener('open', () => {
    store.dispatch(socketConnected());
  });

  socket.addEventListener('error', (event) => {
    store.dispatch(socketError(event));
  });

  // socket.addEventListener('message', (event) => {
  //
  // });
};

const disconnectFromSocketServer = function disconnectFromSocketServer() {
  if (socket !== null) socket.close();
  socket = null;
};

export default function socketMiddleware() {
  return store => next => (action) => {
    switch (action.type) {
      case CONNECT_TO_SOCKET_SERVER:
        connectToSocketServer(store, socket);
        break;
      case DISCONNECT_FROM_SOCKET_SERVER:
        disconnectFromSocketServer(socket);
        break;
      default:
        break;
    }

    return next(action);
  };
}
