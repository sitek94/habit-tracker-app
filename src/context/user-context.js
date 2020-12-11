import * as React from 'react';
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';
import { useAuth } from './auth-context';
import { defaultLocale } from 'localization/locales';
import { createTheme, defaultThemeConstants } from 'theme';
import { useTheme } from '@material-ui/core';
import { useLocale } from 'localization';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

// Default user data object
const defaultUserData = {
  theme: defaultThemeConstants,
  performanceGoal: 75,
  locale: {
    code: defaultLocale.code,
  },
};

/**
 * User Data Provider
 *
 * Provides user data object, which is updated whenever user data
 * changes in the database.
 */
function UserProvider({ children }) {
  const {
    data: userData,
    setData: setUserData,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useAsync({
    data: defaultUserData,
  });

  const { db } = useFirebase();
  const { user } = useAuth();

  /**
   * User data snasphot listener
   */
  React.useEffect(() => {
    const userDataRef = db.ref(`users/${user.uid}`);

    // Set up snapshot listener
    userDataRef.on('value', (snapshot) => {
      // Check if user has a data point in the database
      const userHasData = snapshot.exists();

      if (userHasData) {
        // Merge any user data with the default data
        setUserData({
          ...defaultUserData,
          ...snapshot.val(),
        });
      } else {
        setUserData(defaultUserData);
      }
    });

    // Detach snapshot listener
    return () => userDataRef.off();
  }, [db, user, setUserData]);

  const { theme } = userData;
  const { setTheme } = useTheme();

  /**
   * Watch for theme changes in user data
   */
  React.useEffect(() => {
    if (theme) {
      setTheme(createTheme(theme));
    }
  }, [theme, setTheme]);

  const { locale } = userData;
  const { setLocaleByCode } = useLocale();

  /**
   * Watch for locale changes in user data
   */
  React.useEffect(() => {
    if (locale) {
      setLocaleByCode(locale.code);
    }
  }, [locale, setLocaleByCode]);

  // User data is loading
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  // Error when loading user data
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  // User data successfully loaded
  if (isSuccess) {
    return (
      <UserContext.Provider value={userData}>
        {children}
      </UserContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
