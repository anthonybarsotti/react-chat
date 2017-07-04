
// Dependencies
import {
  CONNECT_TO_SOCKET_SERVER,
  DISCONNECT_FROM_SOCKET_SERVER,
  socketConnecting,
  socketConnected,
  socketError,
} from '../modules/socket';

export default function socketMiddleware() {
  var socket = null;

  return store => next => action => {
    switch(action.type) {
      case CONNECT_TO_SOCKET_SERVER:
        connectToSocketServer(store, socket);
      case DISCONNECT_FROM_SOCKET_SERVER:
        disconnectFromSocketServer(socket);
      default:
        return next(action);
    }
  };
};

function connectToSocketServer(store, socket) {
  socket = new WebSocket(window.location.href.replace(/https?\:\/\//, 'ws://'));
  store.dispatch(socketConnecting());

  socket.addEventListener('open', (event) => {
    store.dispatch(socketConnected());
  });

  socket.addEventListener('error', (event) => {
    store.dispatch(socketError(event));
  });

  socket.addEventListener('message', (event) => {

  });
}

function disconnectFromSocketServer(socket) {
  if (socket !== null) socket.close();
  socket = null;
}
