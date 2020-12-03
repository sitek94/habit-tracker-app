import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { useUserData } from 'context/user-config-context';
import { defaultTheme, createTheme } from './theme';

/**
 * Provides a theme when user is authenticated. The theme is automatically 
 * updated when user's data changes.
 */
function UserThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const { theme: userTheme } = useUserData();

  // Update the theme whenever user's data changes
  React.useEffect(() => {
    setTheme(createTheme(userTheme));
  }, [userTheme]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export { UserThemeProvider };
