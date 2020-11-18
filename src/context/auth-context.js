import { queryCache } from 'react-query';
import * as React from 'react';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';

import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  const { auth } = useFirebase();

  // Auth state change observer
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setData(user);
      } else {
        setData(null);
        queryCache.clear();
      }
    });
  }, [auth, setData]);

  // Sign in (email, password)
  const signIn = React.useCallback(
    ({ email, password }) => auth.signInWithEmailAndPassword(email, password),
    [auth]
  );

  // Sign up (email, password)
  const register = React.useCallback(
    ({ email, password }) =>
      auth.createUserWithEmailAndPassword(email, password),
    [auth]
  );

  // Sign out
  const signOut = React.useCallback(() => {
    auth.signOut();
  }, [auth]);

  // Context value
  const value = React.useMemo(() => ({ user, signIn, signOut, register }), [
    user,
    signIn,
    signOut,
    register,
  ]);



  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
