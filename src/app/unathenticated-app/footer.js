import * as React from 'react';
import { Box } from '@material-ui/core';

/**
 * It changes `color` and `bgcolor` when the screen size is `xs`
 */
function Footer({ children }) {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        color: { xs: 'text.primary', sm: 'common.white' },
        bgcolor: { xs: 'background.paper', sm: 'transparent' },
        opacity: { sm: 0.7 },
      }}
    >
      {children}
    </Box>
  );
}

export { Footer };
