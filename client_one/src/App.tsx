import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { history } from './utils/router_history';
import { ROUTER_PATHS } from './utils/router_paths';
import Login from './components/login/login.component';
import CheckToken from './components/token/check.token.component';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Route exact path={ROUTER_PATHS.BASE} render={() => <Redirect to={ROUTER_PATHS.LOGIN} />} />
      <Route path={ROUTER_PATHS.CHECK_TOKEN} component={CheckToken} />
      <Route path={ROUTER_PATHS.LOGIN} component={Login} />
    </Router>
  );
}

export default App;
