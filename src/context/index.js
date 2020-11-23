import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth-context';
import { FirebaseProvider } from './firebase-context';
import { ThemeProvider } from './theme-context';
import { SnackbarProvider } from './snackbar-context';
import { DialogProvider } from './dialog-context';
import { ReactQueryDevtools } from 'react-query-devtools';
import {
  ReactQueryCacheProvider,
  QueryCache,
  ReactQueryConfigProvider,
} from 'react-query';

const queryCache = new QueryCache();

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

function AppProviders({ children }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
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
    </ReactQueryCacheProvider>
  );
}

export { AppProviders, ModalsProvider };
