
// Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import PrivateRoute from '../components/PrivateRoute';

const mapStateToProps = function mapStateToProps({ account }) {
  return { loggedIn: account.loggedIn };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
