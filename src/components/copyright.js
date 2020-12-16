import * as React from 'react';
import { Typography } from '@material-ui/core';

function Copyright(props) {
  return (
    <Typography variant="subtitle2" {...props} component="div">
      Copyright © 2020 Maciek Sitkowski
    </Typography>
  );
}

export { Copyright };
