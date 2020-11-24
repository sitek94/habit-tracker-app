import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';
import { Dashboard as DashboardIcon } from '@material-ui/icons';
import { ReactComponent as TowingSvg } from 'images/towing.svg';

function NotFoundHabitScreen() {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box clone width="50%" margin={2}>
        <TowingSvg />
      </Box>

      <Box margin={2}>
        <Typography variant="h4">Sorry, this habit doesn't exist...</Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/dashboard"
      >
        <Box clone mr={1}>
          <DashboardIcon />
        </Box>
        Dashboard
      </Fab>
    </Box>
  );
}

export { NotFoundHabitScreen };
