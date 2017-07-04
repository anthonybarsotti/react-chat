
// Dependencies

import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

// Actions

import {
  handleUserNameChange,
  handleColorChange,
  handleFormSubmit,
} from '../redux/modules/account';

// Components

import Login from '../components/Login';

function mapStateToProps({
  account,
  socket,
}) {
  const {
    userName,
    color,
  } = account;
  const {
    connected,
    connecting,
    error,
  } = socket;

  return {
    connectionError: error,
    connecting,
    connected,
    userName,
    color,
  };
}

export default withRouter(connect(mapStateToProps, {
  handleUserNameChange,
  handleColorChange,
  handleFormSubmit,
})(Login));
