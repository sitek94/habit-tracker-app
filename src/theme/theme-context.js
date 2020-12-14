import * as React from 'react';
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';
import { createDefaultTheme, defaultTheme } from './theme';

/**
 * Theme provider
 */
function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const toggleDarkMode = React.useCallback(() => {
    const { mode, primary, secondary } = theme.palette;

    setTheme(
      createMuiTheme({
        palette: {
          primary,
          secondary,
          mode: mode === 'light' ? 'dark' : 'light',
        },
      })
    );
  }, [theme]);

  const resetTheme = React.useCallback(
    () => {
      const { mode } = theme.palette;
      setTheme(createDefaultTheme(mode))
    }, [theme]
  )

  const themeValue = {
    // Theme object has to be spread here so that it properties can be accessed directly.
    ...theme,

    // Additional properties
    setTheme,
    toggleDarkMode,
    resetTheme,
  };

  return (
    <MuiThemeProvider theme={themeValue}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
