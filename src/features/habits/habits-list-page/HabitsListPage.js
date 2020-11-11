import { useEffect, useState } from 'react';

import { Table, TableBody, TableContainer } from '@material-ui/core';

import Loader from 'components/loader';
import ErrorPage from 'components/error-page';

import { useFirebase } from 'services/firebase';

import NoHabits from '../no-habits';
import HabitItem from './habit-item';

const HabitList = () => {
  const { db, user } = useFirebase();

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true);

      try {
        setIsError(false);

        const snapshot = await db
          .ref('habits')
          .orderByChild('user')
          .equalTo(user.uid)
          .once('value');

        let fetchedHabits = snapshot.val();

        // User doesn't have any habits
        if (!fetchedHabits) {
          return;
        }

        // Fetched habits is an object so we need to convert it to an array
        fetchedHabits = Object.entries(fetchedHabits).map(([id, habit]) => ({
          id,
          ...habit,
        }));

        setHabits(fetchedHabits);
      } catch (error) {
        console.log(error);

        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [db, user]);

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
