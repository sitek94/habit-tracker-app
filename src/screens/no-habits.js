import { Add as AddIcon } from '@material-ui/icons';
import { ReactComponent as EmptyBox } from 'images/empty-box.svg';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';

/**
 * No Habits Screen
 * 
 * This screen is used to inform the user that they don't have any habits.
 * It is used for example in 'Manage Habits Screen'. 
 * 
 * There is a big button that navigates the user to 'Add Habit Screen'
 */
function NoHabitsScreen() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        clone
        sx={{
          width: '40%',
          height: '40%',
          margin: 2,
        }}
      >
        <EmptyBox />
      </Box>

      <Box
        sx={{
          margin: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          There are no habits
        </Typography>
        <Typography variant="body1">
          It looks like you don't have any habits yet, why don't you add one?
        </Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/add-habit"
      >
        <Box
          clone
          sx={{
            mr: 1,
          }}
        >
          <AddIcon />
        </Box>
        Add habit
      </Fab>
    </Box>
  );
}

export { NoHabitsScreen };
