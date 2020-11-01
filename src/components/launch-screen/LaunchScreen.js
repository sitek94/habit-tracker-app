import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
});

const LaunchScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <CircularProgress size={100} />
    </div>
  );
};

export default LaunchScreen;
