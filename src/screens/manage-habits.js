import { Box } from '@material-ui/core';
import { HabitList } from 'components/habit-list';
import { FullPageSpinner } from 'components/lib';
import { useHabits } from 'hooks/useHabits';
import NoHabits from 'screens/no-habits';

function ManageHabits() {
  const { data: habits, isLoading } = useHabits();

  if (isLoading) return <FullPageSpinner />;

  if (!habits.length) return <NoHabits />;

  return (
    <Box width="100%" height="100%">
      <HabitList habits={habits} />
    </Box>
  );
}

export default ManageHabits;
