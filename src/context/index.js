import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './auth-context';
import { FirebaseProvider } from './firebase-context';
import { ThemeProvider } from './theme-context';
import { SnackbarProvider } from './snackbar-context';
import { DialogProvider } from './dialog-context';
import { HabitsProvider } from './habits-context';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

function ModalsProvider({ children }) {
  return (
    <DialogProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </DialogProvider>
  );
}

function AuthenticatedAppProviders({ children }) {
  return <HabitsProvider>{children}</HabitsProvider>;
}

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <ThemeProvider>
          <FirebaseProvider>
            <ModalsProvider>
              <AuthProvider>{children}</AuthProvider>
            </ModalsProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools position="bottom-left" />
    </ReactQueryConfigProvider>
  );
}

export { AppProviders, AuthenticatedAppProviders, ModalsProvider };
