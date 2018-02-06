/* globals window */
// Dependencies
import {
  HANDLE_AUTH_SUCCESS,
  RECEIVE_TOKEN,
  handleAuthSuccess,
  handleAuthError,
} from '../modules/authentication';
import {
  sendMessage,
} from '../modules/socket';

export default function () {
  return store => next => (action) => {
    switch (action.type) {
      case RECEIVE_TOKEN:
        try {
          window.sessionStorage.setItem('token', action.token);
        } catch (e) {
          store.dispatch(handleAuthError(e));
        }

        // Confirm login and fetch current state from server
        store.dispatch(handleAuthSuccess());
        store.dispatch(sendMessage('getInitialState'));
        break;
      case HANDLE_AUTH_SUCCESS:
        store.dispatch(sendMessage('newUserNotification'));
        break;
      default:
        break;
    }

    return next(action);
  };
}
