import { Link as RouterLink } from 'react-router-dom';

import { Fab, Box, Typography } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

import { ReactComponent as HelloDarkness } from 'images/hello-darkness.svg';

function NotFoundScreen() {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box clone width="50%" height="50%" margin={2}>
        <HelloDarkness />
      </Box>

      <Box margin={2}>
        <Typography variant="h4">
          Sorry... nothing here.
        </Typography>
      </Box>
      <Fab variant="extended" color="primary" component={RouterLink} to="/dashboard">
        <Box clone mr={1}>
          <HomeIcon />
        </Box>
        Home
      </Fab>
    </Box>
  );
}

export default NotFoundScreen;