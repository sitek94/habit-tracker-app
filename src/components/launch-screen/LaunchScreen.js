import React from 'react';

import { CircularProgress } from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';

const LaunchScreen = () => {
  return (
    <AbsoluteCenter>
      <CircularProgress size={100} />
    </AbsoluteCenter>
  );
};

export default LaunchScreen;
