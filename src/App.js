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

import Snackbar, { SnackbarProvider } from 'components/snackbar';

import { useFirebase } from 'api/firebase-context';

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

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    severity: 'warning',
  });
  const openSnackbar = (severity, message) => {
    setSnackbar({
      isOpen: true,
      message,
      severity,
    });
  };
  const closeSnackbar = () => {
    setSnackbar({
      isOpen: false,
      message: '',
      severity: 'info',
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider openSnackbar={openSnackbar}>
        <CssBaseline />

        <ErrorBoundary>
          {!isReady && <LaunchScreen />}

          {isReady && (
            <>
              <Router navbar={<Navbar />} />
            </>
          )}
          <Snackbar
            autoHideDuration={6000}
            message={snackbar.message}
            severity={snackbar.severity}
            open={snackbar.isOpen}
            onClose={closeSnackbar}
          />
        </ErrorBoundary>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;
