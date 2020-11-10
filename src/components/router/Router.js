import PropTypes from 'prop-types';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useFirebase } from 'services/firebase';
import { HabitsProvider } from 'features/habits';
import { DatesRangeProvider } from 'features/dates-range';

import LandingPage from 'pages/landing-page';

import SignInPage from 'features/auth/sign-in-page';
import SignUpPage from 'features/auth/sign-up-page';

import DashboardPage from 'pages/dashboard';
import AddHabitPage from 'features/habits/add-habit-page';
import EditHabitPage from 'pages/edit-habit';

import NotFoundPage from 'pages/not-found';
import ErrorPage from 'pages/error';

import PrivateRoute from './PrivateRoute';
import WithHabitRoute from './WithHabitRoute';
import Checkmark from 'Checkmark';
import HabitsListPage from 'features/habits/habits-list-page';

const Router = ({ navbar }) => {
  const { user } = useFirebase();

  return (
    <BrowserRouter>
      {navbar}

      <Switch>
      
        <Route exact path="/test">
          <Checkmark date="09-11-2020" habitId="1" />
        </Route>

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
          <HabitsProvider>
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

              <WithHabitRoute
                exact
                path="/dashboard/habits/:habitId"
                component={EditHabitPage}
              />
            </Switch>
          </HabitsProvider>
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
