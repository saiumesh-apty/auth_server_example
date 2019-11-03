import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { history } from './utils/router_history';
import { ROUTER_PATHS } from './utils/router_paths';
import CheckToken from './components/token/check.token.component';
import ValidateToken from './components/token/validate.token.comonent';
import Dashboard from './components/dahsboard/dashboard.component';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Route exact path={ROUTER_PATHS.BASE} render={() => <Redirect to={ROUTER_PATHS.CHECK_TOKEN} />} />
      <Route path={ROUTER_PATHS.CHECK_TOKEN} component={CheckToken} />
      <Route path={ROUTER_PATHS.VALIDATE_TOKEN} component={ValidateToken} />
      <Route path={ROUTER_PATHS.DASHBOARD} component={Dashboard} />
    </Router>
  );
}

export default App;
