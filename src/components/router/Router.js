import PropTypes from 'prop-types';
import { useContext } from 'react';

import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import LandingPage from 'pages/landing-page';
import SignInPage from 'pages/sign-in-page';
import SignUpPage from 'pages/sign-up-page';
import AddHabitPage from 'pages/add-habit-page';
import NotFoundPage from 'pages/not-found-page';

import { FirebaseContext } from 'api/firebase-context';
import HabitsPage from 'pages/habits-page';
import EditHabitPage from 'pages/edit-habit-page';

const Router = ({ navbar }) => {
  const { user } = useContext(FirebaseContext);

  return (
    <BrowserRouter>
      {navbar}

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route exact path="/signin">
          {user ? <Redirect to="/protected" /> : <SignInPage />}
        </Route>

        <Route exact path="/signup">
          <SignUpPage open={true} />
        </Route>

        <PrivateRoute exact path="/protected">
          <h1>Protected</h1>
        </PrivateRoute>

        <PrivateRoute exact path="/add-habit">
          <AddHabitPage />
        </PrivateRoute>

        <PrivateRoute exact path="/habits">
          <HabitsPage />
        </PrivateRoute>

        <PrivateRoute exact path="/habits/:habitId">
          <EditHabitPage />
        </PrivateRoute>

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
  const { user } = useContext(FirebaseContext);

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
