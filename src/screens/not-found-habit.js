import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';
import { Dashboard as DashboardIcon } from '@material-ui/icons';
import { ReactComponent as TowingSvg } from 'images/towing.svg';

function NotFoundHabitScreen() {
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
          width: '50%',
          margin: 2,
        }}
      >
        <TowingSvg />
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="h4">Sorry, this habit doesn't exist...</Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/dashboard"
      >
        <Box
          clone
          sx={{
            mr: 1,
          }}
        >
          <DashboardIcon />
        </Box>
        Dashboard
      </Fab>
    </Box>
  );
}

export { NotFoundHabitScreen };
