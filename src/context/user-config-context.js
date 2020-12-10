import * as React from 'react';
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';
import { useAuth } from './auth-context';
import { defaultLocale } from 'localization/locales';
import { createTheme, defaultThemeConstants } from 'theme';
import { useTheme } from '@material-ui/core';

const UserDataContext = React.createContext();
UserDataContext.displayName = 'UserDataContext';

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
function UserDataProvider({ children }) {
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
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const userDataRef = db.ref(`users/${user.uid}`);

    /**
     * Set up snapshot listener that updates user data whenever it
     * changes in the database
     */
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

  React.useEffect(() => {
    if (theme) {
      setTheme(createTheme(theme));
    }
  }, [theme, setTheme]);

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
      <UserDataContext.Provider value={userData}>
        {children}
      </UserDataContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useUserData() {
  const context = React.useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(`useUserData must be used within a UserDataProvider`);
  }
  return context;
}

export { UserDataProvider, useUserData };
