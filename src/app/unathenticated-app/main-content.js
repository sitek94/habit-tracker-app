import { Box } from '@material-ui/core';

/**
 * Main content wrapper
 */
function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        height: '100%',
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export { MainContent };
