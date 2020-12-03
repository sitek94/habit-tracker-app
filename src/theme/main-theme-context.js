import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

const theme = createMuiTheme();

/**
 * Provides a theme when user is not authenticated
 */
function MainThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export { MainThemeProvider };
