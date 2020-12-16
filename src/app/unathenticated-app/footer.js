import * as React from 'react';
import { Box } from '@material-ui/core';
import { useMatch } from 'react-router';

const landing = {
  color: 'common.white',
  bgColor: 'transparent',
  opacity: 0.7,
};
const authentication = {
  color: { xs: 'text.secondary', sm: 'common.white' },
  bgcolor: { xs: 'background.paper', sm: 'transparent' },
  opacity: { sm: 0.7 },
};

/**
 * It changes `color` and `bgcolor` when the screen size is `xs`
 */
function Footer({ children }) {
  const matches = useMatch('/');

  const style = matches ? landing : authentication;

  return (
    <Box
      component="footer"
      sx={{
        ...style,
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export { Footer };
