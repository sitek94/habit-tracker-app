import PropTypes from 'prop-types';

import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import LandingPage from 'pages/landing-page';
import SignInPage from 'pages/sign-in';
import SignUpPage from 'pages/sign-up';
import NotFoundPage from 'pages/not-found';
import DashboardPage from 'pages/dashboard';

import { useFirebase } from 'features/firebase';
import ErrorPage from 'pages/error';

const Router = ({ navbar }) => {
  const { user } = useFirebase();

  return (
    <BrowserRouter>
      {navbar}

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route exact path="/signin">
          {user ? <Redirect to="/dashboard" /> : <SignInPage />}
        </Route>

        <Route exact path="/signup">
          <SignUpPage />
        </Route>

        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>

        <Route exact path="/error">
          <ErrorPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  user: PropTypes.object,
};

function PrivateRoute({ children, ...rest }) {
  const { user } = useFirebase();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Router;
