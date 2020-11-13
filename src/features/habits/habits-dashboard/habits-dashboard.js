import Loader from 'components/loader';
import ErrorPage from 'components/error-page';
import NoHabits from '../no-habits';

import { useHabits } from 'hooks';
import { DatesRangeController } from 'features/dates-range';
import DashboardList from './dashboard-list';

function HabitsDashboard() {
  const { habits, isLoading, isError } = useHabits();

  // Fetching habits from the database
  if (isLoading) {
    return <Loader />;
  }

  // Error
  if (isError) {
    return (
      <ErrorPage
        title="Error when loading habits"
        desription="Something went wrong when loading the habits, please try again."
      />
    );
  }

  // User doesn't have any habits yet
  if (habits.length === 0) {
    return <NoHabits />;
  }

  // Render user's habits
  return (
    <>
      <DatesRangeController />
      <DashboardList list={habits} />
    </>
  );
};

export default HabitsDashboard;
