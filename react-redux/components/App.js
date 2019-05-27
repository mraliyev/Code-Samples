import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Stats from './stats/Stats';
import Login from './auth/Login';
import { Header, Footer } from './layout';
import ProtectedRoute from './auth/ProtectedRoute';
import OpenTickets from './tickets/OpenTickets';
import OwnTickets from './tickets/OwnTickets';
import WallMonitor from './tickets/WallMonitor';
import InProgress from './tickets/InProgress';
import Settings from './Settings/Settings';
import { setTheme } from '../store/actions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount = () => {
    this.props.setTheme();
  };

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <ProtectedRoute path="/open" component={OpenTickets} />
            <ProtectedRoute path="/inprogress" component={InProgress} />
            <ProtectedRoute path="/own" component={OwnTickets} />
            <ProtectedRoute path="/settings" component={Settings} />
            <Route path="/stats" component={Stats} />
            <Route path="/login" component={Login} />
            <Route path="/wallmonitor" component={WallMonitor} />
            <Redirect to="/open" />
          </Switch>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { setTheme }
)(App);
