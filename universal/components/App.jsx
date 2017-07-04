
// Dependencies

import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

// Components

import Login from '../containers/Login';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.connectToSocketServer();
  }

  componentWillUnmount() {
    this.props.disconnectFromSocketServer();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }

};
