import * as React from 'react';
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';
import { useAuth } from './auth-context';

const UserConfigContext = React.createContext();
UserConfigContext.displayName = 'UserConfigContext';

const defaultUserConfig = {
  theme: null,
  performanceGoal: 75,
  weekStartsOn: 0, // Sunday
};

function UserConfigProvider(props) {
  const {
    data: userConfig,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData,
  } = useAsync();

  const { db } = useFirebase();
  const { user } = useAuth();

  // Listen to changes in user config
  React.useEffect(() => {
    const userConfigRef = db.ref(`users/${user.uid}`);

    userConfigRef.on('value', (snapshot) => {
      // If user has changed the config, it is stored in the database
      const userHasConfig = snapshot.exists();

      if (userHasConfig) {
        setData({
          // Overwrite these values of default config that user has set
          ...defaultUserConfig,
          ...snapshot.val(),
        });
      } else {
        // If there are no stored config, set default config
        setData(defaultUserConfig);
      }
    });

    // Detach listener
    return () => userConfigRef.off();
  }, [db, user, setData]);

  // Context value
  const value = React.useMemo(
    () => ({
      ...userConfig,
    }),
    [userConfig]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <UserConfigContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useUserConfig() {
  const context = React.useContext(UserConfigContext);
  if (context === undefined) {
    throw new Error(`useUserConfig must be used within a UserConfigProvider`);
  }
  return context;
}

export { UserConfigProvider, useUserConfig };
