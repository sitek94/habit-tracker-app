import * as React from 'react';
import { getColor } from './colors';
import { MuiThemeProvider } from '@material-ui/core';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { useUserConfig } from 'context/user-config-context';
import { defaultTheme, createTheme } from './theme';

function UserThemeProvider({ children }) {
  const { db } = useFirebase();
  const { user } = useAuth();
  const { theme: userThemeConfig } = useUserConfig();

  const [theme, setTheme] = React.useState(defaultTheme);

  // Update theme whenever `userThemeConfig` changes
  React.useEffect(() => {
    // Use user config to create new theme
    if (userThemeConfig) {
      setTheme(createTheme(userThemeConfig));

      // Otherwise use default theme
    } else {
      setTheme(defaultTheme);
    }
  }, [userThemeConfig]);

  /**
   * Changes the theme
   */
  const changeTheme = React.useCallback(
    (theme) => {
      if (!theme) {
        throw new Error('`theme` object is required in `useChangeTheme`');
      }

      let primaryColor = theme.primaryColor;
      let secondaryColor = theme.secondaryColor;
      let dark = theme.dark;

      primaryColor = getColor(primaryColor);
      secondaryColor = getColor(secondaryColor);

      return db.ref(`users/${user.uid}/theme`).set({
        primaryColor: primaryColor.id,
        secondaryColor: secondaryColor.id,
        dark: dark,
      });
    },
    [db, user]
  );

  /**
   * Changes primary theme color
   */
  const changePrimaryColor = React.useCallback(
    (primaryColor) => {
      primaryColor = getColor(primaryColor);

      return db
        .ref(`users/${user.uid}/theme/primaryColor`)
        .update(primaryColor.id);
    },
    [db, user]
  );

  /**
   * Changes secondary theme color
   */
  const changeSecondaryColor = React.useCallback(
    (secondaryColor) => {
      secondaryColor = getColor(secondaryColor);

      return db
        .ref(`users/${user.uid}/theme/secondaryColor`)
        .update(secondaryColor.id);
    },
    [db, user]
  );

  /**
   * Change dark mode
   */
  const changeDarkMode = React.useCallback(
    (dark) => {
      return db.ref(`users/${user.uid}/theme/dark`).set(dark);
    },
    [db, user]
  );

  /**
   * Reset theme
   */
  const resetTheme = React.useCallback(() => {
    return db.ref(`users/${user.uid}/theme`).remove();
  }, [db, user]);

  // Context value
  const value = React.useMemo(
    () => ({
      ...theme,
      changeTheme,
      changePrimaryColor,
      changeSecondaryColor,
      changeDarkMode,
      resetTheme,
    }),
    [
      theme,
      changeTheme,
      changePrimaryColor,
      changeSecondaryColor,
      changeDarkMode,
      resetTheme,
    ]
  );

  return <MuiThemeProvider theme={value}>{children}</MuiThemeProvider>;
}

export { UserThemeProvider };
