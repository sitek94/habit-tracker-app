import { Table, TableBody, TableContainer } from '@material-ui/core';

import Loader from 'components/loader';
import ErrorPage from 'components/error-page';
import NoHabits from '../no-habits';
import HabitItem from './HabitItem';

import { useHabits } from '../useHabits';
import { DatesRangeController } from 'features/dates-range';

const HabitsDashboard = () => {
  const [{ habits, isLoading, isError }] = useHabits();

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
      <TableContainer>
        <Table>
          <TableBody>
            {habits.map(habit => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HabitsDashboard;
