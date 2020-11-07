import { Link } from 'react-router-dom';

import { Box, Fab, Table, TableBody, TableContainer } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import EmptyState from 'components/empty-state';
import HabitItem from 'components/habit-item';
import { useHabits } from 'features/habits';
import { ReactComponent as EmptyBox } from 'svgs/empty-box.svg';

const HabitsPage = () => {
  const { habits } = useHabits();

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
          {habits.map(({ id, title, trackedDays }) => (
            <HabitItem
              key={id}
              id={id}
              title={title}
              trackedDays={trackedDays}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HabitsPage;
