import * as React from 'react';
import { Box, Toolbar } from '@material-ui/core';

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toolbar spacer */}
      <Toolbar />

      {/* Content */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export { MainContent };
