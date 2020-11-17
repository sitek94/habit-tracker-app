import { useEffect, useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { DialogProvider } from 'context/dialog-context';
import { SnackbarProvider } from 'context/snackbar-context';
import { useFirebase } from 'services/firebase';

import Router from './router';
import ErrorBoundary from 'components/error-boundary';
import LaunchScreen from 'components/loader';

const theme = createMuiTheme();

function App() {
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
          <ErrorBoundary>
            {!isReady && <LaunchScreen />}

            {isReady && <Router />}
          </ErrorBoundary>
        </DialogProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;
