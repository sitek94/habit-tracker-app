import * as React from 'react';
import { Typography } from '@material-ui/core';

function Copyright(props) {
  return (
    <Typography variant="subtitle2" component="div" {...props}>
      Copyright © {new Date().getFullYear()} Maciek Sitkowski
    </Typography>
  );
}

export { Copyright };
