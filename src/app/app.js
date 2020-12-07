import * as React from 'react';

import { useAuth } from 'context/auth-context';
// import { FullPageSpinner } from 'components/lib';
import AuthenticatedApp from './authenticated-app';
import UnathenticatedApp from './unauthenticated-app';
import { AuthenticatedAppProviders } from 'context';

// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
// const UnathenticatedApp = React.lazy(() =>  import('./unauthenticated-app'));

function App() {
  const { user } = useAuth();

  return (
    // <React.Suspense fallback={<FullPageSpinner />}>
    user ? (
      <AuthenticatedAppProviders>
        <AuthenticatedApp />
      </AuthenticatedAppProviders>
    ) : (
      <UnathenticatedApp />
    )
    // </React.Suspense>
  );
}

export { App };
