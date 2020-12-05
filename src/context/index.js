import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { MainThemeProvider, UserThemeProvider } from 'theme';
import { MainLocaleProvider, UserLocaleProvider } from 'locale';
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
    </MainLocaleProvider>
  );
}

/**
 * Context used only when the user is authenticated
 */
function AuthenticatedAppProviders({ children }) {
  return (
    <UserDataProvider>
      <UserLocaleProvider>
        <UserThemeProvider>{children}</UserThemeProvider>
      </UserLocaleProvider>
    </UserDataProvider>
  );
}

export { AppProviders, AuthenticatedAppProviders };
