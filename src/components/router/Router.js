import PropTypes from 'prop-types';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useFirebase } from 'services/firebase';
import { DatesRangeProvider } from 'features/dates-range';

import LandingPage from 'components/landing-page';

import SignInPage from 'features/auth/sign-in-page';
import SignUpPage from 'features/auth/sign-up-page';

import AddHabitPage from 'features/habits/add-habit-page';
import EditHabitPage from 'features/habits/edit-habit-page';

import NotFoundPage from 'components/not-found-page';
import ErrorPage from 'components/error-page';

import PrivateRoute from './PrivateRoute';
import HabitsListPage from 'features/habits/habits-list-page';
import DashboardPage from 'features/habits/habits-dashboard';

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
          <Switch>
            <Route exact path="/dashboard">
              <DatesRangeProvider>
                <DashboardPage />
              </DatesRangeProvider>
            </Route>

            <Route exact path="/dashboard/add-habit">
              <AddHabitPage />
            </Route>

            <Route exact path="/dashboard/habits">
              <HabitsListPage />
            </Route>

            <Route exact path="/dashboard/habits/:habitId">
              <EditHabitPage />
            </Route>
          </Switch>
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

export default Router;
