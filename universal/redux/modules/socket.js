
// Constants
export const CONNECT_TO_SOCKET_SERVER = 'socket/CONNECT_TO_SOCKET_SERVER';
export const DISCONNECT_FROM_SOCKET_SERVER = 'socket/DISCONNECT_FROM_SOCKET_SERVER';
const SOCKET_CONNECTING = 'socket/SOCKET_CONNECTING';
const SOCKET_CONNECTED = 'socket/SOCKET_CONNECTED';
const SOCKET_ERROR = 'socket/SOCKET_ERROR';

// Action Creators
export function connectToSocketServer() {
  return {
    type: CONNECT_TO_SOCKET_SERVER,
  };
}

export function disconnectFromSocketServer() {
  return {
    type: DISCONNECT_FROM_SOCKET_SERVER,
  };
}

export function socketConnecting() {
  return {
    type: SOCKET_CONNECTING,
    connecting: true,
  }
}

export function socketConnected() {
  return {
    type: SOCKET_CONNECTED,
    connected: true,
    connecting: false,
  };
}

export function socketError(error) {
  return {
    type: SOCKET_ERROR,
    connecting: false,
    error,
  };
}

// Reducer

export default function reducer(state = {
  connecting: false,
  connected: false,
  error: null,
}, {
  type,
  connecting,
  connected,
  error,
}) {
  switch (type) {
    case SOCKET_CONNECTING:
      return {
        ...state,
        connecting,
      };
    case SOCKET_CONNECTED:
      return {
        ...state,
        connecting,
        connected,
      };
    case SOCKET_ERROR:
      return {
        ...state,
        connecting,
        error,
      };
    default:
      return state;
  }
}
