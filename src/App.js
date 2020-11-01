import { useState } from 'react';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';

import Router from 'components/router';
import ErrorBoundary from 'components/error-boundary';
import LaunchScreen from 'components/launch-screen';
import Navbar from 'components/navbar';

const theme = createMuiTheme();

const App = () => {
  const [isReady, setIsReady] = useState(true);

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
