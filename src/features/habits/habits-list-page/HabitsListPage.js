import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Fab, Table, TableBody, TableContainer } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ReactComponent as EmptyBox } from 'svgs/empty-box.svg';

import ErrorPage from 'pages/error';

import EmptyState from 'components/empty-state';
import HabitItem from '../habit-item';
import Loader from 'components/loader';

import { useFirebase } from 'services/firebase';

const HabitsListPage = () => {
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
          ...habit
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

  // Fetching habits from the database
  if (isLoading) {
    return <Loader />;
  }

  console.log(habits);

  // Error
  if (isError) {
    return (
      <ErrorPage
        title="Error when loading habits"
        desription="Something went wrong when loading the habits, please try again."
      />
    );
  }

  // User doesn't have any habits yet, render a page with
  // a link to `Add habit` page
  if (habits.length === 0) {
    return (
      <EmptyState
        image={<EmptyBox />}
        title="No habits"
        description="It looks like you don't have any habits yet"
        button={
          <Fab
            variant="extended"
            color="primary"
            component={Link}
            to="/dashboard/add-habit"
          >
            <Box clone mr={1}>
              <AddIcon />
            </Box>
            Create habit
          </Fab>
        }
      />
    );
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
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HabitsListPage;
