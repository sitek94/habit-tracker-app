import { useEffect, useState } from 'react';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

import Router from 'components/router';
import ErrorBoundary from 'components/error-boundary';
import LaunchScreen from 'components/loader';
import Navbar from 'components/navbar';

import { SnackbarProvider } from 'context/snackbar-context';
import { DialogProvider } from 'context/dialog-context';
import { useFirebase } from 'services/firebase';

const theme = createMuiTheme();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const { user } = useFirebase();

  useEffect(() => {
    if (user === undefined) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [user]);

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <DialogProvider>
          <CssBaseline />

          <ErrorBoundary>
            {!isReady && <LaunchScreen />}

            {isReady && (
              <>
                <Router navbar={<Navbar />} />
              </>
            )}
          </ErrorBoundary>
        </DialogProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;
