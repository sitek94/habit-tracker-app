import * as React from 'react';
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';
import { createTheme, defaultTheme } from './theme';

/**
 * Theme provider
 */
function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const toggleDarkMode = React.useCallback(() => {
    const {
      palette: { mode },
    } = theme;

    setTheme(
      createMuiTheme({
        palette: {
          mode: mode === 'light' ? 'dark' : 'light',
        },
      })
    );
  }, [theme]);

  const themeValue = {
    // Theme object has to be spread here so that it properties can be accessed directly.
    ...theme,

    // Additional properties
    setTheme,
    toggleDarkMode,
  };

  return (
    <MuiThemeProvider theme={themeValue}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
