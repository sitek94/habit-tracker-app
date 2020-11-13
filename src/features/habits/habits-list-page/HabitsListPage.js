import { Table, TableBody, TableContainer } from '@material-ui/core';

import Loader from 'components/loader';
import ErrorPage from 'components/error-page';
import NoHabits from '../no-habits';
import HabitItem from './HabitItem';

import { useHabits } from 'hooks';

const HabitList = () => {
  const { habits, isLoading, isError, setHabits} = useHabits();

  const deleteHabit = habitId => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

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
    <TableContainer>
      <Table>
        <TableBody>
          {habits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onDeleteClick={() => deleteHabit(habit.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HabitList;
