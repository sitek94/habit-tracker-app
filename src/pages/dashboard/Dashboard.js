import { Switch, Route, useRouteMatch } from 'react-router-dom';

import HabitsPage from 'pages/habits-list';
import EditHabitPage from 'pages/edit-habit';
import AddHabitPage from 'pages/add-habit';

import { HabitsProvider } from 'features/habits';

const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <HabitsProvider>
      <Switch>
        <Route exact path={`${path}/add-habit`}>
          <AddHabitPage />
        </Route>
        <Route exact path={`${path}/habits`}>
          <HabitsPage />
        </Route>
        <Route exact path={`${path}/habits/:habitId`}>
          <EditHabitPage />
        </Route>
      </Switch>
    </HabitsProvider>
  );
};
export default Dashboard;
