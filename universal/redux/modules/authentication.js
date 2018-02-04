
// Constants

export const HANDLE_USERNAME_CHANGE = 'account/HANDLE_USERNAME_CHANGE';
export const HANDLE_COLOR_CHANGE = 'account/HANDLE_COLOR_CHANGE';
export const HANDLE_FORM_SUBMIT = 'account/HANDLE_FORM_SUBMIT';
export const HANDLE_AUTH_SUCCESS = 'account/HANDLE_AUTH_SUCCESS';
export const HANDLE_AUTH_ERROR = 'account/HANDLE_AUTH_ERROR';
export const RECEIVE_TOKEN = 'account/RECEIVE_TOKEN';

// Action Creators

export function handleUsernameChange(value) {
  return {
    type: HANDLE_USERNAME_CHANGE,
    value,
  };
};

export function handleColorChange(value) {
  return {
    type: HANDLE_COLOR_CHANGE,
    value,
  };
};

export function handleAuthSuccess() {
  return {
    type: HANDLE_AUTH_SUCCESS,
  };
};

export function handleAuthError(error) {
  return {
    type: HANDLE_AUTH_ERROR,
    error,
  };
};

// Reducer

export default function reducer(state = {
  loggedIn: false,
  authError: null,
  username: '',
  color: '',
}, {
  type,
  value,
  error,
}) {
  switch (type) {
    case HANDLE_USERNAME_CHANGE:
      return {
        ...state,
        username: value,
      };
    case HANDLE_COLOR_CHANGE:
      return {
        ...state,
        color: value,
      };
    case HANDLE_AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case HANDLE_AUTH_ERROR:
      return {
        ...state,
        loggedIn: false,
        authError: error,
      };
    default:
      return state;
  }
};
