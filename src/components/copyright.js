import * as React from 'react';
import { Box, Typography } from '@material-ui/core';

function Copyright(props) {
  return (
    <Typography variant="subtitle2" {...props} component="div">
      <Box sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Copyright © {new Date().getFullYear()} Maciek Sitkowski
      </Box>
    </Typography>
  );
}

export { Copyright };
