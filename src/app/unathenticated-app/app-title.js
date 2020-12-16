import * as React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Displays app name as a link to `/` route
 */
function AppTitle() {
  return (
    <Box
      clone
      sx={{
        textTransform: 'none',
      }}
    >
      <Button color="inherit" component={RouterLink} to="/" disableRipple>
        <Typography variant="h6">{process.env.REACT_APP_TITLE}</Typography>
      </Button>
    </Box>
  );
}

export { AppTitle };
