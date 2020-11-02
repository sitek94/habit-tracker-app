import { useContext, useEffect, useState } from 'react';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

import Router from 'components/router';
import ErrorBoundary from 'components/error-boundary';
import LaunchScreen from 'components/launch-screen';
import Navbar from 'components/navbar';
import { FirebaseContext } from 'api/firebase-context';

const theme = createMuiTheme();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    if (user === undefined) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [user]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <ErrorBoundary>
        {!isReady && <LaunchScreen />}

        {isReady && (
          <>
            <Router navbar={<Navbar />} />
          </>
        )}
      </ErrorBoundary>
    </MuiThemeProvider>
  );
};

export default App;
