import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './auth-context';
import { FirebaseProvider } from './firebase-context';
import { ThemeProvider } from './theme-context';
import { SnackbarProvider } from './snackbar-context';
import { DialogProvider } from './dialog-context';

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

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <ThemeProvider>
          <FirebaseProvider>
            <SnackbarProvider>
              <DialogProvider>
                <AuthProvider>{children}</AuthProvider>
              </DialogProvider>
            </SnackbarProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export { AppProviders };
export { HabitsProvider, useHabits } from './habits-context';
export { CheckmarksProvider, useCheckmarks } from './checkmarks-context';
