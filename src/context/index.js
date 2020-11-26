import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { MainThemeProvider, UserThemeProvider } from 'theme';
import { AuthProvider } from './auth-context';
import { FirebaseProvider } from './firebase-context';
import { SnackbarProvider } from './snackbar-context';
import { DialogProvider } from './dialog-context';
import { UserConfigProvider } from './user-config-context';

const queryCache = new QueryCache();

/**
 * Shared context across all app
 */
function AppProviders({ children }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <MainThemeProvider>
          <FirebaseProvider>
            <DialogProvider>
              <SnackbarProvider>
                <AuthProvider>{children}</AuthProvider>
              </SnackbarProvider>
            </DialogProvider>
          </FirebaseProvider>
        </MainThemeProvider>
      </Router>
      <ReactQueryDevtools position="bottom-left" />
    </ReactQueryCacheProvider>
  );
}

/**
 * Context used only when the user is authenticated
 */
function AuthenticatedAppProviders({ children }) {
  return (
    <UserConfigProvider>
      <UserThemeProvider>{children}</UserThemeProvider>
    </UserConfigProvider>
  );
}

export { AppProviders, AuthenticatedAppProviders };
