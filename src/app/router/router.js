import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './private-route';

import { Layout } from 'layout';

import PublicWrapper from './public-wrapper';
import DashboardWrapper from './dashboard-wrapper';

/**
 * App router
 *
 */
const Router = () => {
  return (
    <BrowserRouter>
      <Route>
        <Layout>
          <Switch>
            <Route exact path="/" component={PublicWrapper} />
            <PrivateRoute exact path="/dashboard" component={DashboardWrapper} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
      </Route>
    </BrowserRouter>
  );
};

export default Router;
