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
} from 'react-query';

const queryCache = new QueryCache();


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
    </ReactQueryCacheProvider>
  );
}

export { AppProviders, ModalsProvider };
