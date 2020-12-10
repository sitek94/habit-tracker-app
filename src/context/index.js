import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ThemeProvider } from 'theme';
import { MainLocaleProvider, UserLocaleProvider } from 'localization';
import { AuthProvider } from './auth-context';
import { FirebaseProvider } from './firebase-context';
import { SnackbarProvider } from './snackbar-context';
import { DialogProvider } from './dialog-context';
import { UserDataProvider } from './user-config-context';

const queryCache = new QueryCache();

/**
 * Shared context across all app
 */
function AppProviders({ children }) {
  return (
    <MainLocaleProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <ThemeProvider>
            <FirebaseProvider>
              <DialogProvider>
                <SnackbarProvider>
                  <AuthProvider>{children}</AuthProvider>
                </SnackbarProvider>
              </DialogProvider>
            </FirebaseProvider>
          </ThemeProvider>
        </Router>
        <ReactQueryDevtools position="bottom-left" />
      </ReactQueryCacheProvider>
    </MainLocaleProvider>
  );
}

/**
 * Context used only when the user is authenticated
 */
function AuthenticatedAppProviders({ children }) {
  return (
    <UserDataProvider>
      <UserLocaleProvider>{children}</UserLocaleProvider>
    </UserDataProvider>
  );
}

export { AppProviders, AuthenticatedAppProviders };
