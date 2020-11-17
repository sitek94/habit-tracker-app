import { Link } from 'react-router-dom';

import { Box, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ReactComponent as EmptyBox } from 'svgs/empty-box.svg';

import EmptyState from 'components/empty-state';

const NoHabits = () => {
  return (
    <EmptyState
      image={<EmptyBox />}
      title="No habits"
      description="It looks like you don't have any habits yet, why don't you add one?"
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
          Add habit
        </Fab>
      }
    />
  );
};

export default NoHabits;
