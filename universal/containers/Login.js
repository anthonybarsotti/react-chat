
// Dependencies

import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import {
  handleUserNameChange,
  handleColorChange,
  handleFormSubmit,
} from '../redux/modules/account';

// Components

import Login from '../components/Login';

function mapStateToProps({
  account,
}) {
  return {
    userName: account.userName,
    color: account.color,
  };
}

export default withRouter(connect(mapStateToProps, {
  handleUserNameChange,
  handleColorChange,
  handleFormSubmit,
})(Login));
