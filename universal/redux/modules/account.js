
// Constants

const HANDLE_USERNAME_CHANGE = 'account/HANDLE_USERNAME_CHANGE';
const HANDLE_COLOR_CHANGE = 'account/HANDLE_COLOR_CHANGE';
const HANDLE_FORM_SUBMIT = 'account/HANDLE_FORM_SUBMIT';

// Action Creators

export function handleUserNameChange(value) {
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

export function handleFormSubmit(data) {
  return {
    type: HANDLE_FORM_SUBMIT,
    data,
  };
};

// Reducer

export default function reducer(state = {
  loggedIn: false,
  userName: '',
  color: '',
}, action) {
  switch (action.type) {
    case HANDLE_USERNAME_CHANGE:
      return {
        ...state,
        userName: action.value,
      };
    case HANDLE_COLOR_CHANGE:
      return {
        ...state,
        color: action.value,
      };
    case HANDLE_FORM_SUBMIT:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};
